import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewCourse, addNewCourseList } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddNewCourse = ({course, addNewCourse, addNewCourseList}) => {
    const [courseName, setCourseName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseFile, setCourseFile] = useState([]);
    const [courseLength, setCourseLength] = useState(0);

    const handleFile = (e) => {
        setCourseFile(e.target.files[0])
    }

    let fileReader;
    const handleFileRead = (e) => {
        var content = fileReader.result;
        content = content.split()
        setCourseFile(content)
        setCourseLength(JSON.parse(content).length)
    }
    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file)
    };

    const handleFileUpload = (courseId, courseName, courseFile, courseLength, file, name) => {
        addNewCourse(courseId, courseName, courseFile)

        const newImg = file;
        const title = name;
        const uploadTask = storage.ref(`/list_course/${title}`).put(newImg);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("list_course")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                console.log("URLL", url)
                addNewCourseList(courseId, courseName, courseLength, url)
            });
        });
    }

    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(undefined);

    const handleFilex = (e) => {
        setImageFile(e.target.files[0])
        setName(e.target.files[0].name)
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
                    <Label htmlFor="name">Image</Label>
                    <Input type="file" onChange={handleFilex} id="pdfUpload"></Input>
                    <UncontrolledTooltip placement='right' target="pdfUpload">
                        Image
                    </UncontrolledTooltip>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="5">
                    <Label htmlFor="courseFile">File Flash Data (json.txt)</Label>
                    <Input type="file" onChange={(e)=>{handleFileChosen(e.target.files[0])}} id="courseFile"></Input>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(courseId, courseName, courseFile, courseLength, imageFile, name)}}>Add Data</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewCourse: (courseId, courseName, courseFile) => {
            dispatch(addNewCourse(courseId, courseName, courseFile))
        },
        addNewCourseList: (courseId, courseName, courseLength, url) => {
            dispatch(addNewCourseList(courseId, courseName, courseLength, url))
        }
    })
}


export default connect(null, mapDispatchToProps)(AddNewCourse);