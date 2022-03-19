import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Row, Progress } from 'reactstrap'
import { compose } from 'redux'
import ResourceCard from '../Cards/ResourceCard'
import VideoCard from '../Cards/VideoCard'
import AddResourcesForm from '../Forms/AddResourceForm'
import AddVideoForm from '../Forms/AddVideoForm'
import CustomModal from '../Modal'
import FlashCard from '../Cards/FlashCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const dummy = {
    title: 'Test Course',
    branch: 'CSE',
    teacher: 'John Doe',
    courseId: ''
}


const CourseContainer = ({course, profile, dataCourse}) => {

    const currentCourse = course ? course[0] : dummy
    const isStudent = profile.userType === 'Student' ? true :  false;
    const isAdmin = profile.userType === 'Admin' ? true :  false;

    console.log('profile', profile)

    const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);
    const [isResourcesFormOpen, setIsResourcesFormOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [percent, setPercent] = useState(0)

    const videoFormToggle = () => setIsVideoFormOpen(!isVideoFormOpen);
    const resourceFormToggle = () =>  setIsResourcesFormOpen(!isResourcesFormOpen);

    const handleStartLearn = () => {
        setIsCourseOpen(true)
    }

    const profileX = profile.SRN
    let objDataCourseNew = []
    let objDataCourseRemind = []
    if(dataCourse) {

        for ( var index=0; index<dataCourse.length; index++ ) {
            if (dataCourse[index] && Object.keys(dataCourse[index].learned).includes(profileX)) {
                objDataCourseRemind.push(dataCourse[index])
            } else {
                objDataCourseNew.push(dataCourse[index])
            }
        }
    }

    console.log('objDataCourseRemind', objDataCourseRemind, 'objDataCourseNew', objDataCourseNew);

    useEffect(() => {
        if(objDataCourseRemind, dataCourse) {
            setPercent(objDataCourseRemind.length / dataCourse.length * 100)
        }
    },[objDataCourseRemind])
    

    return(
        <Col>
            <Row>
                <Col md="4">
                    <h5 className="course-title">Course Title: <span className="c-title">{currentCourse.title || dummy.title}</span></h5>
                    <h5 className="course-title">Course Id: <span className="c-title">{currentCourse.courseId || dummy.courseId}</span></h5>
                    <h5 className="course-title">Tống số từ vựng: <span className="c-title">{dataCourse ? dataCourse.length : '0'}</span></h5>
                    {isStudent ? <h5 className="course-title">Tổng số từ bạn đã học: <span className="c-title">{objDataCourseRemind ? objDataCourseRemind.length : '0'}</span></h5> : ''}
                    {/* {isStudent ? ''  : <Button onClick={videoFormToggle} className="button navy">Add Video</Button>}
                    {isStudent ? ''  :<Button onClick={resourceFormToggle} className="button mt-2" color="primary">Add Resource</Button>} */}
                    {isStudent ? ''  :<Button onClick={handleStartLearn} className="button mt-2" color="primary">Show Detail</Button>}
                    {isAdmin ? ''  : <Button onClick={handleStartLearn} className="button mt-2">Học ngay</Button>}
                </Col>
                <Col md='8'>
                    <Col md="6" style={{margin:'auto', maxWidth: '40%'}}>
                        {/* <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                            })}
                        /> */}
                        {isStudent ? <h4 className="course-title">Tiến độ: <span className="c-title">{percent.toFixed(2)}%</span></h4> : ''}
                        
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    {isCourseOpen && isStudent?
                            <FlashCard course={course} profile={profile} />:
                        <h3>Học ngay cùng KIT EDU!</h3>
                    }
                    {isCourseOpen && isAdmin?
                    <>
                        <h3>Thống kê số lượng kiến thức đã học theo từng user</h3>
                        <p>Comming soon</p>
                    </> : '' }

                </Col>
            </Row>
        
            <CustomModal modal={isVideoFormOpen} title="Add New Video" toggle={videoFormToggle}>
                <AddVideoForm course={course}></AddVideoForm>
            </CustomModal>  
            <CustomModal modal={isResourcesFormOpen} title="Add New Resource" toggle={resourceFormToggle}>
                <AddResourcesForm course={course}></AddResourcesForm>
            </CustomModal>

        </Col>
  )
}

const mapStateToProps = (state) =>{
    return{
        course: state.firestore.ordered.course,
        profile: state.firebase.profile,
        dataCourse: state.firestore.ordered.dataCourse,
        auth: state.firebase.auth,
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    (props) => [
        {
            collection: 'courses',
            where: ['title', '==', `${props.title}`],
            storeAs: 'course'
        },
        {
            collection: props.course ? `${props.course[0].courseId}` : 'khoahoc',
            where: [['image', '!=', '']],
            storeAs: 'dataCourse'
        }
    ]    
))(CourseContainer);