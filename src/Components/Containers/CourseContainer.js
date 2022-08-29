import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Row, Col, Button} from 'reactstrap'
import { compose } from 'redux'
import CustomModal from '../Modal'
import 'react-circular-progressbar/dist/styles.css';
import { updateStudentLearnedCount } from '../../Store/actions/courseActions'
import EditCourseForm from '../Forms/EditCourseForm'
import EditDataCourseForm from '../Forms/EditDataCourseForm'



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
    const [isDataCourseOpen, setIsDataCourseOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState({})

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);
    const toggleDataCourse = (item) => {
        setIsDataCourseOpen(!isDataCourseOpen);
        setDataEdit(item)
    }


    console.log('course', course);
    console.log('dataCourse', dataCourse);

    return(
        <Col>
            <Row md="12">
                <Col md="12">
                    <Button outline color='success' onClick={toggleCourse}>Edit Khóa học</Button>
                </Col>
                <Col md="12" style={{marginTop: "10px"}}>
                    <div className='xxxm'></div>
                </Col>
            </Row>
            <Row md="12">
                <Col md="12">
                    <div>
                        <h4>Danh sách từ vựng</h4>
                    </div>
                    {dataCourse ? dataCourse.map(function(item, index){
                        return <div key={index} className="words_statistic__group admin"> 
                                    <h4 className="words_statistic__title admin">{item.wordTitle}</h4>
                                    <h4 className="words_statistic__meaning admin">{item.meaning}</h4>
                                    <img className='modal_image__custom' src={item.image ? item.image : ""} alt='image' height={"50px"}></img>
                                    <div>
                                        <Button onClick={() => toggleDataCourse(item)} outline color='danger'>Edit</Button>
                                    </div>
                                    {/* <h4 className="words_statistic__speaker" key={index}>{item.voice}</h4> */}
                                </div>
                        }) : ""}
                </Col>
                <Col md="12" style={{marginTop: "10px"}}>
                    <div className='xxxm'></div>
                </Col>
            </Row>

            <CustomModal title="Edit Khóa học" modal={isCourseOpen} toggle={toggleCourse}>
                <EditCourseForm course={course}/>
            </CustomModal>
            <CustomModal title="Edit data khóa học" modal={isDataCourseOpen} toggle={toggleDataCourse}>
                <EditDataCourseForm course={course} dataEdit={dataEdit}/>
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