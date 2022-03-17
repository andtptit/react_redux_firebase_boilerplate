import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardImg, Col, Row, Button} from 'reactstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Camera from '../../Assets/camera.svg'
import {setStudentSuspended, updateStudentDisplayPic} from '../../Store/actions/studentActions'
import {storage} from '../../config/fbConfig'
import CustomModal from '../Modal/';
import EditStudentForm from '../Forms/EditStudentForm'
import CustomAlert from '../Alert/'

const dummy = {
    'img': 'https://i.ibb.co/wd8cRVZ/img-person-placeholder.jpg',
    'name' : 'John Doe',
    'SRN' : 'dsu1200'
}

const FlashStoreInfo =  ({name, student,setStudentSuspended, updateStudentDisplayPic, detailCourse}) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentStudent = student ? student[0] : dummy

    let detail = detailCourse.khoahoc
    console.log('detail', detail ? detail.length: '' )
    let total = detail ? detail.length: 0

    const toggle = () => setIsOpen(!isOpen);


    return(
        <>
            <Row>
                <Col md="3">
                    <h3>Có tất cả {total} từ vựng.</h3>
                </Col>
                <Col md="6">
                
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        student: state.firestore.ordered.users,
        detailCourse: state.firestore.ordered,
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        setStudentSuspended: (student) => {
            dispatch(setStudentSuspended(student))
        },
        updateStudentDisplayPic: (student, url) => {
            dispatch(updateStudentDisplayPic(student,url))
        }
    })
}



export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
    (props) => [
        {
            collection: `${props.name}`,
            where: ['courseName','!=', ``]
        }
    ]    
))(FlashStoreInfo);
