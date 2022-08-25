import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateStudentInfo } from '../../Store/actions/studentActions'
import CustomAlert from '../Alert'

const GalleryImageForm = ({course, updateStudentInfo, edited}) => {

    const updateStudent = () => {
       updateStudentInfo(inputs)
    }    
    
    const {inputs, handleInputChange, handleSubmit} = useForm({
        id: course[0].courseId, 
        name: course[0].title,
    }, updateStudent);


    return(
        <Form onSubmit={handleSubmit}>
            <Container>
            <Row md="12">
                <img onClick={() => console.log("XXX")} width={"100px"} src='https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/list_course%2Fenglish-words-for-starter-1621594978.jpg?alt=media&token=9d88078e-571f-4c1d-9166-4523c2abd44b'></img>
                <img width={"100px"} src="https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/list_course%2Flet's%20go.png?alt=media&token=03b820d7-469a-4ac5-8d2e-78eccd326e55"></img>
            </Row>
            <Button type="submit" className="mt-3 mb-3" color="primary">Save</Button>
            {edited && <CustomAlert alert={edited}></CustomAlert>}
            </Container>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(GalleryImageForm);


