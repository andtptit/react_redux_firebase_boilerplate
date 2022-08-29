import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row, UncontrolledTooltip } from 'reactstrap'
import { compose } from 'redux'
import { updateDataCourseFull } from '../../Store/actions/courseActions'
import CustomModalL from '../Modal/CustomModalL'
import {storage} from "../../config/fbConfig"
import { firestoreConnect } from 'react-redux-firebase'

const AddDataCourseForm = ({course}) => {

    const [imgURLArr, setImgURLArr] = useState([])
    const [imgURL, setImgURL] = useState()

    const dummy = {
        wordId: "",
        wordTitle: "",
        meaning: "",
        meaning_key: "",
        example: "",
        image: "",
        learned: Object,
        voice: ""
    }


    const [isCourseOpen, setIsCourseOpen] = useState(false)
    const [newObjData, setNewObjData] = useState()

    const [dataFlash, setDataFlash] = useState(dummy)

    const handleInputChangeWordId = (e) => {
        setDataFlash({
            ...dataFlash,
            wordId: e
        })
    }

    const handleInputChangeTitle = (e) => {
        setDataFlash({
            ...dataFlash,
            wordTitle: e
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

    const handleEditDataCourse = () => {
        if (dataFlash.wordId != '') {
            console.log("xxx")
        }else{
            console.log('yyy')
        }
    }

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);

    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(undefined);
    const handleFilex = (e) => {
        setImageFile(e.target.files[0])
        setName(e.target.files[0].name)
    }

    console.log('dataFlash', dataFlash.example)
    let arr_ex = ""

    return(
        <Form>
            <Container>
            <Row md="12">
                <Col md="12">
                    <Label htmlFor="wordid">Word ID</Label>
                    <Input type="text" id="wordid" value={dataFlash && dataFlash.wordId}  onChange={(e) => handleInputChangeWordId(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" value={dataFlash && dataFlash.wordTitle} onChange={(e) => handleInputChangeTitle(`${e.target.value}`)}></Input>
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
            <Button onClick={() => handleEditDataCourse()} className="mt-3 mb-3" color="primary">Edit Data</Button>
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
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) =>{
    console.log('props', props)
    return [
        {
        collection: `${props.course[0].courseId}`,
        }
    ]
})
)(AddDataCourseForm);


