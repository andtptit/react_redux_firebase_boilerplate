import React, { useState, useEffect }  from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { updateCourse } from '../../Store/actions/courseActions'
import CustomAlert from '../Alert'
import GalleryImageForm from './GalleryImageForm'
import CustomModalL from '../Modal/CustomModalL'
import {storage} from "../../config/fbConfig"

const EditCourseForm = ({course, updateCourse, edited}) => {

    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const toggleCourse = () => setIsCourseOpen(!isCourseOpen);
    
    const [imgURLArr, setImgURLArr] = useState([])
    const [imgURL, setImgURL] = useState(course[0].imgUrl)

    const [newTitle, setNewTitle] = useState(course[0].title)

    const handleInputChange = (e) => {
        setNewTitle(e)
    }

    useEffect(() => {
      let arr_img = []
      console.log('render img')
      storage
          .ref("list_course")
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

    console.log('course', course)

    useEffect(() => {
        setImgURL(course[0].imgUrl)
    }, [course[0].imgUrl])


    const hanldeSaveCourse = () => {
        updateCourse(course, newTitle)
    }

    return(
        <Form>
            <Container>
            <Row md="12">
                <Col md="5">
                    <Label htmlFor="name">Course ID</Label>
                    <Input type="text" id="courseId" value={course[0].courseId} disabled></Input>
                </Col>
            </Row>
            <Row md="12">
                <Col md="12">
                    <Label htmlFor="srn">Name</Label>
                    <Input type="text" id="title" value={newTitle} onChange={(e) => handleInputChange(`${e.target.value}`)}></Input>
                </Col>
            </Row>
            <div className='course_form__edit_group'>
                <Col md="6">
                    <img className='modal_image__custom' src={imgURL ? imgURL : ""} alt='image' height={"50px"}></img>
                </Col>
                <Col md="6" style={{margin: "auto"}}>
                    <Button outline color='success' onClick={toggleCourse}>Change Image</Button>
                </Col>
            </div>
            <Button onClick={() => hanldeSaveCourse()} className="mt-3 mb-3" color="primary">Save</Button>
            {edited && <CustomAlert alert={edited}></CustomAlert>}
            </Container>
            <CustomModalL title="Select Image" modal={isCourseOpen} toggle={toggleCourse}>
                <GalleryImageForm dataCourse={false} course={course} arr_img={imgURLArr}/>
            </CustomModalL>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        edited: state.student.upload
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        updateCourse: (course, newTitle) => {
            dispatch(updateCourse(course, newTitle))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(EditCourseForm);


