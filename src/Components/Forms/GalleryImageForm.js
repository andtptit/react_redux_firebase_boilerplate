import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import { updateImageCourse, updateImageDataCourse } from '../../Store/actions/courseActions'
import CustomAlert from '../Alert'

const GalleryImageForm = ({course, updateImageCourse, updateImageDataCourse, dataCourse, arr_img, dataEdit}) => {

    const [indexImg, setIndexImg] = useState(0)
    const [arrayImg, setArrayImg] = useState(arr_img)
    const [selectedImg, setSelectedImg] = useState("")

    const handleSelectImg = (e) => {
        setIndexImg(e)
        console.log(arr_img[e])
        setSelectedImg(arr_img[e])
    }

    useEffect(() => {
        console.log('render')
        setArrayImg(arr_img)
    },[])

    function handleChangeImage(selectedImg){
        updateImageCourse(selectedImg, course)
    }

    function handleChangeImageDataCourse(selectedImg){
        updateImageDataCourse(selectedImg, course, dataEdit)
    }



    return(
        <Form >
            <Container>
            <Row md="12">
                {arrayImg.map((imgURL, index) => {
                    return <div key={index} className={indexImg == index ? "modal_image__custom active" : "modal_image__custom"}>
                                <img onClick={() => handleSelectImg(index)} height={"40px"} src={imgURL}></img>
                            </div>
                })}
            </Row>
            {
                dataCourse ? <Button onClick={() => handleChangeImageDataCourse(selectedImg)} className="mt-3 mb-3" color="primary">Save Image</Button> :
                <Button onClick={() => handleChangeImage(selectedImg)} className="mt-3 mb-3" color="primary">Save Image</Button>
            }
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    console.log('state', state)
    return{
        edited: state.student.upload
    }
}


const mapDispatchToProps = (dispatch) => {
    return({
        updateImageCourse: (selectedImg, course) => {
            dispatch(updateImageCourse(selectedImg, course))
        },
        updateImageDataCourse: (selectedImg, course, dataEdit) => {
            dispatch(updateImageDataCourse(selectedImg, course, dataEdit))
        }
    })
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(GalleryImageForm);