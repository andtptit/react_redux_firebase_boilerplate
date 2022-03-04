import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import {addCourse} from '../../Store/actions/courseActions'


const AddNewCampainForm = ({addCourse, branches,courseFile}) => {
    
    const handleCourse = () => {
        addCourse(inputs)
    }



    const { inputs, handleInputChange, handleSubmit} = useForm({title:'', courseFile:'All', timeLearning: ''}, handleCourse)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="title">Title</Label>
                        <Input  type="text" id="title" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="courseUrl">File data</Label>
                        <Input type="select" className="selector" name="select" id="courseUrl" onChange={handleInputChange}>
                            <option value='All'>All Data</option>
                            {courseFile && courseFile.map((courseF, index) => (
                            <option key={index} value={courseF.url}>{courseF.title}</option>
                            ))}           
                        </Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="timeLearning">Thời gian học</Label>
                        <Input type="text"  id="timeLearning" onChange={handleInputChange}></Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Course 
                </Button>
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log(state);
    return{
        courseFile: state.firestore.ordered.courseFile
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        addCourse: (course) => {
            dispatch(addCourse(course))
        }
    })
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {
            collection: 'courseFile'
        }
    ])
)(AddNewCampainForm);

