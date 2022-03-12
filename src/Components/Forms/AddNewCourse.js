import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewCourse, addNewCourseList } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddNewCourse = ({course, addNewCourse, addNewCourseList}) => {
    const [courseName, setCourseName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseFile, setCourseFile] = useState([]);

    const handleFile = (e) => {
        setCourseFile(e.target.files[0])
    }

    let fileReader;
    const handleFileRead = (e) => {
        var content = fileReader.result;
        content = content.split()
        setCourseFile(content)
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    };

    const handleFileUpload = (courseId, courseName, courseFile) => {
        addNewCourse(courseId, courseName, courseFile)
        addNewCourseList(courseId, courseName)
    }

    return(
        <Container>
            <Row md="12">
                <Col>
                    <Label htmlFor="courseId">ID Course</Label>
                    <Input type="" id="courseId" value={courseId} onChange={(e) => setCourseId(e.target.value)}></Input>
                </Col>
            </Row>
            <Row md="12">
                <Col>
                    <Label htmlFor="courseName">Title</Label>
                    <Input type="" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)}></Input>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="5">
                    <Label htmlFor="courseFile">File Course Data</Label>
                    <Input type="file" onChange={(e)=>{handleFileChosen(e.target.files[0])}} id="courseFile"></Input>
                    {/* <UncontrolledTooltip placement='right' target="pdfUpload">
                        Video Files
                    </UncontrolledTooltip> */}
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(courseId, courseName, courseFile)}}>Add Data</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewCourse: (courseId, courseName, courseFile) => {
            dispatch(addNewCourse(courseId, courseName, courseFile))
        },
        addNewCourseList: (courseId, courseName) => {
            dispatch(addNewCourseList(courseId, courseName))
        }
    })
}


export default connect(null, mapDispatchToProps)(AddNewCourse);