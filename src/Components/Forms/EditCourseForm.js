import React, { useState }  from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateStudentInfo } from '../../Store/actions/studentActions'
import CustomAlert from '../Alert'
import GalleryImageForm from './GalleryImageForm'
import CustomModal from '../Modal'

const EditCourseForm = ({course, updateStudentInfo, edited}) => {

    const updateStudent = () => {
       updateStudentInfo(inputs)
    }    
    
    const {inputs, handleInputChange, handleSubmit} = useForm({
        id: course[0].courseId, 
        name: course[0].title,
    }, updateStudent);

    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);


    return(
        <Form onSubmit={handleSubmit}>
            <Container>
            <Row md="12">
                <Col md="5">
                    <Label htmlFor="name">Course ID</Label>
                    <Input type="text" id="name" value={inputs.id} onChange={handleInputChange} disabled></Input>
                </Col>
            </Row>
            <Row md="12">
                <Col md="12">
                    <Label htmlFor="srn">Name</Label>
                    <Input type="text" id="srn" value={inputs.name} onChange={handleInputChange}></Input>
                </Col>
            </Row>
            <Row md="12">
                <Col md="8">
                    <img src="" alt='image' width={"50px"} heigh={"50px"}></img>
                </Col>
                <Col md="4">
                    <Button onClick={toggleCourse}>Change Image</Button>
                </Col>
            </Row>
            <Button type="submit" className="mt-3 mb-3" color="primary">Save</Button>
            {edited && <CustomAlert alert={edited}></CustomAlert>}
            </Container>
            <CustomModal title="Add New Course" modal={isCourseOpen} toggle={toggleCourse}>
                <GalleryImageForm course={course}/>
            </CustomModal>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        edited: state.student.edited
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        updateStudentInfo: (student) => {
            dispatch(updateStudentInfo(student))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(EditCourseForm);


