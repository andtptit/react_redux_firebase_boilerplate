import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip, Form, FormFeedback } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewCourse, addNewCourseList } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'

const AddNewCourse = ({course, addNewCourse, addNewCourseList, toggle}) => {
    const [courseName, setCourseName] = useState('')
    const [courseId, setCourseId] = useState('')
    const [courseFile, setCourseFile] = useState([])
    const [courseLength, setCourseLength] = useState(0)
    const [name, setName] = useState('')
    const [imageFile, setImageFile] = useState(undefined)

    const url_default = 'https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/list_course%2FFlashcard_Course_Default.png?alt=media&token=241ff983-3e45-4722-9d76-8e1c11da9741'


    let fileReader;
    const handleFileRead = (e) => {
        var content = fileReader.result
        content = content.split()
        setCourseFile(content)
        setCourseLength(JSON.parse(content).length)
    }
    const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    };

    const handleFileUpload =  (courseId, courseName, courseFile, courseLength, file, name) => {
        addNewCourse(courseId, courseName, courseFile)

        if (name != '') {
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
        }else
        {
            
            addNewCourseList(courseId, courseName, courseLength, url_default)
        }
    }

    const handleFilex = (e) => {
        setImageFile(e.target.files[0])
        setName(e.target.files[0].name)
    }

    console.log('toggle', toggle);

    return(
        <Form>
            <Container>
                <Row md="12">
                    <Col>
                        <Label htmlFor="courseId">ID Course</Label>
                        <Input
                            type="" id="courseId" value={courseId}
                            onChange={(e) => {
                                setCourseId(e.target.value)
                                }}>
                        </Input>

                    </Col>
                </Row>
                <Row md="12">
                    <Col>
                        <Label htmlFor="courseName">Title</Label>
                        <Input 
                            type="" id="courseName" value={courseName}
                            onChange={(e) => {
                                setCourseName(e.target.value)
                            }}>
                        </Input>
                    </Col>
                </Row>
                <Row md="12" className="mt-3">
                    <Col md="5">
                        <Label htmlFor="name">Image</Label>
                        <Input type="file" onChange={(e) => handleFilex(e.target.value)} id="pdfUpload"></Input>
                        <UncontrolledTooltip placement='right' target="pdfUpload">
                            Image
                        </UncontrolledTooltip>
                    </Col>
                </Row>
                <Row md="12" className="mt-3">
                    <Col md="5">
                        <Label htmlFor="courseFile">File Flash Data (json.txt)</Label>
                        <Input type="file" onChange={(e)=>{
                            e.target.files[0] ? handleFileChosen(e.target.files[0]) : setCourseFile([])
                            }} id="courseFile"></Input>
                    </Col>
                </Row>
                {courseId != '' && courseName != '' && courseFile != '' ? <Button color="primary" className="mt-3 mb-3" onClick={() => {
                    handleFileUpload(courseId, courseName, courseFile, courseLength, imageFile, name)}}>
                        Add Data
                    </Button> :
                <Button disabled color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(courseId, courseName, courseFile, courseLength, imageFile, name)}}>Add Data</Button>}
            </Container>
        </Form>
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