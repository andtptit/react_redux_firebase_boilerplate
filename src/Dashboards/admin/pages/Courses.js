import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Container, Row, Col, Input, Button} from 'reactstrap'
import CourseCard from '../../../Components/Cards/CourseCard'
import CustomModal from '../../../Components/Modal'
import AddNewCampainForm from '../../../Components/Forms/AddNewCampainForm'
import AddNewDataCourse from '../../../Components/Forms/AddNewDataCourse'
import AddNewCourse from '../../../Components/Forms/AddNewCourse'
import Sliders from '../../../Components/Sliders'

const Courses = ({course, profile}) => {

 const admin = profile.userType === "Admin" ? true : false

 const [isCourseOpen, setIsCourseOpen] = useState(false)

 const toggleCourse = () => setIsCourseOpen(!isCourseOpen)


 return(
    <Container className="mt-4 mb-4">
        <Row className="mt-4 mb-4">
            <Col md="8">
            <h1 className="table-title mt-3 mb-3">Danh sách các khóa học</h1>
            </Col>
            <Col md="4">
                {admin ? <Button color='primary' className="mt-auto w-auto" onClick={toggleCourse}>Add New Course</Button> : undefined}
            </Col>
        </Row>
        <div className="dyno-break"></div>
        {/* <CourseCard branch={branch} admin={admin}></CourseCard> */}
        
        {admin ? <CourseCard profile={profile} courseData={course} ></CourseCard>: ""}
        
        <CustomModal title="Add New Course" modal={isCourseOpen} toggle={toggleCourse}>
            <AddNewCourse course={course} />
        </CustomModal>
    </Container>
 )
}

const mapStateToProps = (state) => {
    
    console.log('courses', state.firestore.ordered.courses);
    return{
        profile: state.firebase.profile,
        course: state.firestore.ordered.courses
    }   
}


export default compose(connect(mapStateToProps),  firestoreConnect([
    {
        collection: 'courses',
        where: [['courseId', '!=', '']],
        storeAs: 'courses'
    },  
])) (Courses);