import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Row, Col, Button} from 'reactstrap'
import { compose } from 'redux'
import CustomModal from '../Modal'
import 'react-circular-progressbar/dist/styles.css';
import { updateStudentLearnedCount } from '../../Store/actions/courseActions'
import EditCourseForm from '../Forms/EditCourseForm'



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

    const [isCourseOpen, setIsCourseOpen] = useState(false);

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);


    console.log('course', course);
    console.log('dataCourse', dataCourse);


        
    return(
        <Col>
            <Row md="12">
                <Button onClick={toggleCourse}>Edit Khóa học {course && course[0].title}</Button>

            </Row>

            <CustomModal title="Add New Course" modal={isCourseOpen} toggle={toggleCourse}>
                <EditCourseForm course={course}/>
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
    (props) => {
        console.log("props", props)
        return [{
            collection: 'courses',
            where: ['courseId', '==', `${props.courseId}`],
            storeAs: 'course'
        },
        {
            collection: `${props.courseId}`,
            where: [['image', '!=', '']],
            storeAs: 'dataCourse'
        }]
}
))(CourseContainer);