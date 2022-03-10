import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Row } from 'reactstrap'
import { compose } from 'redux'
import ResourceCard from '../Cards/ResourceCard'
import VideoCard from '../Cards/VideoCard'
import AddResourcesForm from '../Forms/AddResourceForm'
import AddVideoForm from '../Forms/AddVideoForm'
import CustomModal from '../Modal'
import Axios from 'axios'


const dummy = {
    title: 'Test Course',
    branch: 'CSE',
    teacher: 'John Doe',
    courseId: ''
}


const CourseContainer = ({course, profile}) => {

    const currentCourse = course ? course[0] : dummy
    const isStudent = profile.userType === 'Student' ? true :  false;


    const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);
    const [isResourcesFormOpen, setIsResourcesFormOpen] = useState(false);
    const [courseUrl, setCourseUrl] = useState("");
    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [isButtonStarOpen, setIsButtonStarOpen] = useState(false)

    const videoFormToggle = () => setIsVideoFormOpen(!isVideoFormOpen);
    const resourceFormToggle = () =>  setIsResourcesFormOpen(!isResourcesFormOpen);

    const fetchComments=async()=>{
        const response=await Axios('https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/courseFile%2FList%20300%20t%E1%BB%AB%20v%E1%BB%B1ng%20h%E1%BA%B1ng%20ng%C3%A0y?alt=media&token=a14a4ead-fcd7-4fe4-bb6f-fe971baad83c');
        setCourseUrl(response)
    }
    console.log(courseUrl);

    const handleStartLearn = () => {
        setIsCourseOpen(true)
        setIsButtonStarOpen(false)
    }

    return(
        <Col>
        <Row>
            <Col md="4">
                <h5 className="course-title">Course Title: <span className="c-title">{currentCourse.title || dummy.title}</span></h5>
                <h5 className="course-title">Course Id: <span className="c-title">{currentCourse.courseId || dummy.courseId}</span></h5>
                {isStudent ? ''  : <Button onClick={videoFormToggle} className="button navy">Add Video</Button>}
                {isStudent ? ''  :<Button onClick={resourceFormToggle} className="button mt-2" color="primary">Add Resource</Button>}
                {!isStudent ? ''  : <Button onClick={fetchComments} className="button mt-2">Học ngay</Button>}
            </Col>
        </Row>
        <Row>
            <Col md="4">
                {isCourseOpen ? 
                        <Col md="12">
                            Đã bắt đầu học
                        </Col> :
                        <Col md="12">
                            Học ngay cùng Kit edu!
                        </Col>
                    }
            </Col>
        </Row>
        {/* <Row className="mt-3 mb-3">
            <Col>
                <div className="mt-2 mb-3">
                    <h4 className="title">Course Videos</h4>
                </div>
                {currentCourse.videos ? 
                <div className="w-100 mb-2 empty-div">
                    <p className="center-text">No Videos yet!</p>
                </div>
                :
                <VideoCard videos={currentCourse.videos} course={course}></VideoCard>
                }
            </Col>
        </Row>
        <Row className="mt-3 mb-3">
            <Col>
                <div className="mt-2 mb-3">
                    <h4 className="title">Course Resources</h4>
                </div>
                
                {currentCourse.videos ? 
                <div className="w-100 mb-2 empty-div">
                    <p className="center-text">No Course Materials yet!</p>
                </div>
                : <ResourceCard resources={currentCourse.references} course={course}></ResourceCard>}
            </Col>
        </Row> */}
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
        profile: state.firebase.profile,
        course: state.firestore.ordered.course,
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    (props) => [
        {
            collection: 'courses',
            where: ['title', '==', `${props.title}`],
            storeAs: 'course'
        }
    ]    
))(CourseContainer);