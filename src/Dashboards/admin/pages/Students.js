import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { Container, Input,Row, Col, Button} from 'reactstrap'
import { compose } from 'redux'
import {connect} from 'react-redux';
import StudentTable from '../../../Components/Table/StudentTable'
import CustomModal from '../../../Components/Modal'
import AddNewCourse from '../../../Components/Forms/AddNewCourse';
import AddStudentForm from '../../../Components/Forms/AddStudentForm';



const Students = ({course}) => {
    const [selectedBranch, setSelectedBranch] = useState('All')
    const admin = true

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen)
    const [isCourseOpen, setIsCourseOpen] = useState(false)

    const handleBranch = (e) => {
        setSelectedBranch(e.target.value)
    }


    return(
        <Container className="mt-4 mb-4">
            <h1 className="table-title">Danh sách Students</h1>
            <Row className="mt-4 mb-4">
                    <Col md="4">
                    </Col>
                    <Col md="4">
                    </Col>
                    <Col md="4">
                        {admin ? <Button color='primary' className="mt-auto w-auto" onClick={toggleCourse}>Add Student</Button> : undefined}
                    </Col>
                
            </Row>
            <StudentTable branch={selectedBranch}></StudentTable>
            <CustomModal title="Add Student" modal={isCourseOpen} toggle={toggleCourse}>
                <AddStudentForm course={course} />
            </CustomModal>
        </Container>        
    )
}



const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'branches'
    },   
]))(Students);


