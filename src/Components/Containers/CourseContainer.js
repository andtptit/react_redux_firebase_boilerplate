import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Card, CardBody, CardImg, Row, Col, CardSubtitle, Container, CardHeader, Button, Progress, CardText} from 'reactstrap'
import { compose } from 'redux'
import ResourceCard from '../Cards/ResourceCard'
import VideoCard from '../Cards/VideoCard'
import AddResourcesForm from '../Forms/AddResourceForm'
import AddVideoForm from '../Forms/AddVideoForm'
import CustomModal from '../Modal'
import FlashCard from '../Cards/FlashCard'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStudentLearnedCount } from '../../Store/actions/courseActions'

const dummy = {
    title: 'Test Course',
    branch: 'CSE',
    teacher: 'John Doe',
    courseId: ''
}


const CourseContainer = ({course, profile, dataCourse, updateStudentLearnedCount}) => {

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
        updateStudentLearnedCount(course)
    }

    const handleContinueLearn = () => {
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
            <Row md="12">
                <Col md='6' >
                    <Card style={{minHeight: '250px'}} className="course-card" body outline color="info">
                    <CardHeader className="course-t">Name: <strong>{currentCourse.title || dummy.title}</strong></CardHeader>
                    {/* {!isCourseOpen && <CardImg top width="100%" src="https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/images%2Fkit_background_3.png?alt=media&token=82bba651-74e1-47e1-9546-4cdf288684f1" alt="Card image cap" />} */}
                        <CardBody>
                            {/* <CardText className="mb-2 subtitle">ID khóa học: <strong>{currentCourse.courseId || dummy.courseId}</strong></CardText>  */}
                            <CardText className="mb-2 subtitle">Số lượng từ vựng: {dataCourse ? dataCourse.length : '0'}</CardText>
                            <CardText className="mb-2 subtitle">Số lượng từ bạn đã học: {objDataCourseRemind ? objDataCourseRemind.length : '0'}</CardText>
                            <CardText className="mb-2 subtitle">Mô tả: Khóa học dành cho người mới bắt đầu...</CardText>
                            <Col style={{paddingLeft: '0'}} md="6">
                            {isStudent ? ''  :<Button onClick={handleStartLearn} className="button mt-2" color="primary">Show Detail</Button>}
                            {isStudent && objDataCourseRemind.length && !isCourseOpen ? <Button size="lg" onClick={handleContinueLearn} className="button mt-2">Tiếp tục học</Button> : ''}
                            {isStudent && !objDataCourseRemind.length && !isCourseOpen ? <Button size="lg" onClick={handleStartLearn} className="button mt-2">Bắt đầu ngay</Button> : ''}

                            </Col>
                        </CardBody>
                    </Card> 
                    <CustomModal itle="Remove Course">
                        <Container>
                            <h4>Are you sure?</h4>
                            <Button color="danger" className="card-button w-25" >Yes</Button>
                            <Button color="primary" className="card-button w-25 ml-2 mr-2" >No</Button>
                        </Container>
                    </CustomModal>
                </Col>
                <Col md='6' >
                    <Card className="course-card" body outline color="info">
                    {/* <CardHeader className="course-t">Name: <strong>{currentCourse.title || dummy.title}</strong></CardHeader> */}
                    <CardImg top width="100%" src="https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/images%2Fkit_background_3.png?alt=media&token=82bba651-74e1-47e1-9546-4cdf288684f1" alt="Card image cap" />
                    <Progress className='mt-2' value={percent.toFixed(2)} />
                    <div className="text-center">Tiến độ {percent.toFixed(2)}%</div>
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    {isCourseOpen && isStudent?
                            <FlashCard course={course} objDataCourseNew={objDataCourseNew} objDataCourseRemind={objDataCourseRemind} profile={profile} />:
                        <h3>Học ngay cùng KIT EDU!</h3>
                    }
                    { objDataCourseRemind.length ? <h4>Đã học xong</h4> : <h4>Chưa học xong</h4> }
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

const mapDispatchToProps = (dispatch) => {
    return{
        updateStudentLearnedCount: (course) => {
            dispatch(updateStudentLearnedCount(course))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
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