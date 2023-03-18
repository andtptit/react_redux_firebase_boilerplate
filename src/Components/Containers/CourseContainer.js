import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Row, Col, Button, Container } from 'reactstrap'
import { compose } from 'redux'
import CustomModal from '../Modal'
import 'react-circular-progressbar/dist/styles.css';
import { updateStudentLearnedCount, removeDataFromCourse, updateCourseLength, removeDataCourse, removeCourse } from '../../Store/actions/courseActions'
import EditCourseForm from '../Forms/EditCourseForm'
import EditDataCourseForm from '../Forms/EditDataCourseForm'
import AddDataCourseForm from '../Forms/AddDataCourseForm'


const CourseContainer = ({course, profile, dataCourse, removeCourse, removeDataCourse, removeDataFromCourse, updateCourseLength}) => {
    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [isAddataOpen, setIsAddDataOpen] = useState(false)
    const [isDataCourseOpen, setIsDataCourseOpen] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false)
    
    const toggle = (item) => {
        setIsOpen(!isOpen)
        setDataEdit(item)
    }

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen)
    const toggleAddDataCourse = () => setIsAddDataOpen(!isAddataOpen)
    const toggleDeleteCourse = () => setIsDeleteCourseOpen(!isDeleteCourseOpen)

    const toggleDataCourse = (item) => {
        setIsDataCourseOpen(!isDataCourseOpen);
        setDataEdit(item)
    }

    const handleRemoveDataCourse = (item) => {
        setDataEdit(item)
        removeDataFromCourse(course, dataEdit)

        updateCourseLength(course, "delete")
        setIsOpen(false)
    }

    const handleCourseRemoval = (course) => {
        removeCourse(course)
        removeDataCourse(course)
        setIsDeleteCourseOpen(false)
        
    }


    return(
        <Col>
            <Row md="12">
                <Col md="3">
                    <Button outline color='success' onClick={toggleCourse}>Edit Khóa học</Button>
                </Col>
                <Col md="3">
                    <Button outline color='primary' onClick={toggleAddDataCourse}>Thêm từ vựng</Button>
                </Col>
                <Col md="3">
                    <Button outline color='danger' onClick={toggleDeleteCourse}>Xóa khóa học</Button>
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
                    {dataCourse ? dataCourse.map((item, index) => 
                        <div key={index} className="words_statistic__group admin">
                                    <Col md="3">
                                        <h4 className="words_statistic__title admin">{item.wordTitle}</h4>
                                    </Col>
                                    <Col md="4">
                                        <h4 className="words_statistic__meaning admin">{item.meaning}</h4>
                                    </Col>
                                    <Col md="3">
                                        <img className='modal_image__custom' src={item.image ? item.image : ""} alt='image' height={"50px"}></img>
                                    </Col>
                                    <Col md="2">
                                        <div>
                                            <Button className='mr-3' onClick={() => toggleDataCourse(item)} outline color='primary'>Edit</Button>
                                            <Button onClick={() => toggle(item)} outline color='danger'>Delete</Button> 
                                        </div>
                                    </Col>
                                    <CustomModal toggle={toggle} modal={isOpen} title="Remove Data">
                                        <Container>
                                            <h4>Are you sure?</h4>
                                            <Button color="danger" className="card-button w-25" onClick={() => handleRemoveDataCourse(index)}>Yes</Button>
                                            <Button color="primary" className="card-button w-25 ml-2 mr-2" onClick={toggle}>No</Button>
                                        </Container>
                                    </CustomModal>
                                </div>
                        ) : ""}
                </Col>
                <Col md="12" style={{marginTop: "10px"}}>
                    <div className='xxxm'></div>
                </Col>
            </Row>

            <CustomModal title="Edit Khóa học" modal={isCourseOpen} toggle={toggleCourse}>
                <EditCourseForm course={course}/>
            </CustomModal>
            <CustomModal title="Thêm từ vựng" modal={isAddataOpen} toggle={toggleAddDataCourse}>
                <AddDataCourseForm course={course} dataCourse={dataCourse}/>
            </CustomModal>
            <CustomModal title="Edit data khóa học" modal={isDataCourseOpen} toggle={toggleDataCourse}>
                <EditDataCourseForm course={course} dataEdit={dataEdit}/>
            </CustomModal>

            <CustomModal toggle={toggleDeleteCourse} modal={isDeleteCourseOpen} title="Xóa khóa học">
                <Container>
                    <h4>Are you sure?</h4>
                    <Button color="danger" className="card-button w-25" onClick={() => handleCourseRemoval(course)}>Yes</Button>
                    <Button color="primary" className="card-button w-25 ml-2 mr-2" onClick={toggleDeleteCourse}>No</Button>
                </Container>
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
        },
        removeDataFromCourse: (course, item) => {
            dispatch(removeDataFromCourse(course, item))
        },
        updateCourseLength: (course, actionX) => {
            dispatch(updateCourseLength(course, actionX))
        },
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        },
        removeDataCourse: (course) => {
            dispatch(removeDataCourse(course))
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
            where: [['wordId', '!=', '']],
            storeAs: 'dataCourse'
        }]
}
))(CourseContainer);