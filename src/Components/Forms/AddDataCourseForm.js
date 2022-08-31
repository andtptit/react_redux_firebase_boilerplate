import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row, UncontrolledTooltip } from 'reactstrap'
import { compose } from 'redux'
import { updateDataCourseFull, addDataToCourseList, updateCourseLength } from '../../Store/actions/courseActions'
import CustomModalL from '../Modal/CustomModalL'
import {storage} from "../../config/fbConfig"
import { firestoreConnect } from 'react-redux-firebase'

const AddDataCourseForm = ({addDataToCourseList, course, dataCourse, updateCourseLength}) => {

    const actionX = "add"

    const dummy = {
        wordId: "",
        wordTitle: "",
        subTitle: "",
        meaning: "",
        meaning_key: "",
        example: "",
        image: "",
        learned: Object,
        voice: ""
    }

    const url_default = 'https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/list_course%2FFlashcard_Course_Default.png?alt=media&token=241ff983-3e45-4722-9d76-8e1c11da9741'

    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [dataFlash, setDataFlash] = useState(dummy)
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(undefined);

    const handleInputChangeTitle = (e) => {
        setDataFlash({
            ...dataFlash,
            wordTitle: e
        })
    }

    const handleInputChangeSubTitle = (e) => {
        setDataFlash({
            ...dataFlash,
            subTitle: e
        })
    }

    const handleInputChangeExample = (e, i) => {
        
        let ex = e.replace(/\r?\n/g, "|")

        console.log(JSON.stringify(ex))
        console.log(JSON.stringify(e))
        
        setDataFlash({
            ...dataFlash,
            example: ex
        })
    }

    const handleInputChangeMeaning = (e) => {        
        setDataFlash({
            ...dataFlash,
            meaning: e
        })
    }

    const handleAddDataToCourse = (file, name) => {
        if (name != '') {
            const newImg = file;
            const title = name;
            const uploadTask = storage.ref(`/courses/${title}`).put(newImg);
            uploadTask.on("state_changed", console.log, console.error, () => {
              storage
                .ref("courses")
                .child(title)
                .getDownloadURL()
                .then((url) => {
                    addDataToCourseList(course, dataFlash, url)
                });
            });
        }else
        {
            
            addDataToCourseList(course, dataFlash, url_default)
        }

        updateCourseLength(course, actionX)
    }

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);
    const handleFilex = (e) => {
        setImageFile(e.target.files[0])
        setName(e.target.files[0].name)
    }

    let arr_ex = ""

    return(
        <Form>
            <Container>
            <Row md="12">
                <Col md="12">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" value={dataFlash && dataFlash.wordTitle} onChange={(e) => handleInputChangeTitle(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="subTitle">SubTitle</Label>
                    <Input type="text" id="subTitle" value={dataFlash && dataFlash.subTitle} onChange={(e) => handleInputChangeSubTitle(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="meaning">Meaning</Label>
                    <Input type="text" id="meaning" value={dataFlash && dataFlash.meaning} onChange={(e) => handleInputChangeMeaning(`${e.target.value}`)}></Input>
                </Col>

                <Col md="12">
                    <Label htmlFor="example">Example</Label>
                    {dataFlash.example && dataFlash.example.split("|").map((ex, index) => {
                        arr_ex = arr_ex + ex + "\r"
                    })}
                    <Input className='mb-2' rows="5" type="textarea" id="example" value={arr_ex.slice(0, -1)}  onChange={(e) => handleInputChangeExample(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="name">Image</Label>
                    <Input type="file" onChange={handleFilex} id="pdfUpload"></Input>
                    <UncontrolledTooltip placement='right' target="pdfUpload">
                        Image
                    </UncontrolledTooltip>
                </Col>
            </Row>
            {dataFlash.wordTitle != '' && dataFlash.meaning != '' && dataFlash.example != '' ? 
                <Button onClick={() => handleAddDataToCourse(imageFile, name)} className="mt-3 mb-3" color="primary">Add Data</Button> :
                <Button disabled  className="mt-3 mb-3" color="primary">Add Data</Button>
            }
            <CustomModalL title="Select Image" modal={isCourseOpen} toggle={toggleCourse}>
                
            </CustomModalL>
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        dataEdit2: state.firestore.ordered.dataEdit2
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        updateDataCourseFull: (course, newObjData) => {
            dispatch(updateDataCourseFull(course, newObjData))
        },
        addDataToCourseList: (course, dataFlash, url) => {
            dispatch(addDataToCourseList(course, dataFlash, url))
        },
        updateCourseLength: (course, actionX) => {
            dispatch(updateCourseLength(course, actionX))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) =>{
    console.log('props', props)
    return [
        {
        collection: `${props.course[0].courseId}`
        }
    ]
})
)(AddDataCourseForm);


