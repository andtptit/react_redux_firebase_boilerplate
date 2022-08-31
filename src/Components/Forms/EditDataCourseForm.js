import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateDataCourseFull } from '../../Store/actions/courseActions'
import GalleryImageForm from './GalleryImageForm'
import CustomModalL from '../Modal/CustomModalL'
import {storage} from "../../config/fbConfig"
import { firestoreConnect } from 'react-redux-firebase'

const EditDataCourseForm = ({dataEdit2, course, updateDataCourseFull, edited, dataEdit}) => {

    const [imgURLArr, setImgURLArr] = useState([])
    const [imgURL, setImgURL] = useState(dataEdit.imgUrl)
    useEffect(() => {
        let arr_img = []
        storage
            .ref("courses")
            .listAll()
            .then(function(result) {
              console.log(result.items);
              result.items.forEach(function(fileRef) {
                fileRef.getDownloadURL().then(function(fileURL) {
                    console.log(fileURL);
                    arr_img.push(fileURL);
                })
            });
          });
          setImgURLArr(arr_img)
      },[])

    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [newObjData, setNewObjData] = useState(dataEdit)

    const handleInputChangeTitle = (e) => {
        setNewObjData({
            ...newObjData,
            wordTitle: e
        })
    }

    const handleInputChangeSubTitle = (e) => {
        setNewObjData({
            ...newObjData,
            subTitle: e
        })
    }

    const handleInputChangeExample = (e, i) => {
        e = e.replace('\n', '|');

        setNewObjData({
            ...newObjData,
            example: e
        })
    }

    const handleInputChangeMeaning = (e) => {
        setNewObjData({
            ...newObjData,
            meaning: e
        })
    }

    const handleEditDataCourse = () => {
        updateDataCourseFull(course, newObjData)
    }

    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);

    console.log('dataEdit2', dataEdit2)
    
    let arr_ex = ""


    return(
        <Form>
            <Container>
            <Row md="12">
                <Col md="12">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" value={newObjData.wordTitle} onChange={(e) => handleInputChangeTitle(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="subTitle">SubTitle</Label>
                    <Input type="text" id="subTitle" value={newObjData.subTitle} onChange={(e) => handleInputChangeSubTitle(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <Label htmlFor="meaning">Meaning</Label>
                    <Input type="text" id="meaning" value={newObjData.meaning} onChange={(e) => handleInputChangeMeaning(`${e.target.value}`)}></Input>
                </Col>

                <Col md="12">
                    <Label htmlFor="example">Example</Label>
                    {newObjData.example && newObjData.example.split("|").map((ex, index) => {
                        arr_ex = arr_ex + ex + "\r"
                    })}
                    <Input className='mb-2' rows="5" type="textarea" id="example" value={arr_ex.slice(0, -1)} onChange={(e) => handleInputChangeExample(`${e.target.value}`)}></Input>
                </Col>
                <Col md="12">
                    <div className='course_form__edit_group'>
                        <Col md="6">
                            <img className='modal_image__custom' src={dataEdit2 && dataEdit2[0] ? dataEdit2[0].image: ""} alt='image' height={"50px"}></img>
                        </Col>
                        <Col md="6" style={{margin: "auto"}}>
                            <Button outline color='success' onClick={toggleCourse}>Change Image</Button>
                        </Col>
                    </div>
                </Col>
            </Row>
            <Button onClick={() => handleEditDataCourse()} className="mt-3 mb-3" color="primary">Edit Data</Button>
            <CustomModalL title="Select Image" modal={isCourseOpen} toggle={toggleCourse}>
                <GalleryImageForm dataCourse={true} dataEdit={dataEdit} course={course} arr_img={imgURLArr}/>
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
        where: ['wordId', '==', `${props.dataEdit.wordId}`],
        storeAs: 'dataEdit2'
        }
    ]
})
)(EditDataCourseForm);


