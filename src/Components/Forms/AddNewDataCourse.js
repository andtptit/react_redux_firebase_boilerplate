import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewCourseFile } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddNewDataCourse = ({course, addNewCourseFile}) => {
    const [name, setName] = useState('');
    const [courseFile, setCourseFile] = useState(undefined);

    const handleFile = (e) => {
        setCourseFile(e.target.files[0])
    }

    console.log('newdata', course);

    const handleFileUpload = (file, course, name) => {
        const currentCourse = course;
        const newVideo = file;
        const title = name;
        const uploadTask = storage.ref(`/courseFile/${title}`).put(newVideo);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("courseFile")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                addNewCourseFile(currentCourse, title, url)
            });
        });
        }

    return(
        <Container>
            <Row md="12">
                <Col>
                    <Label htmlFor="name">Title</Label>
                    <Input type="" id="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="5">
                    <Label htmlFor="name">File Course Data</Label>
                    <Input type="file" onChange={handleFile} id="pdfUpload"></Input>
                    {/* <UncontrolledTooltip placement='right' target="pdfUpload">
                        Video Files
                    </UncontrolledTooltip> */}
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(courseFile, course, name)}}>Add Data</Button>
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewCourseFile: (course, title, url) => {
            dispatch(addNewCourseFile(course, title, url))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddNewDataCourse);