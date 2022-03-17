import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Row, Form, Label, Input } from 'reactstrap'
import useForm from '../../Hooks/useForm'
import { compose } from 'redux'


const dummy = {
    "workId": "Not Found",
    "workTitle": "Not Found",
    "meaning": "Not Found",
    "example": ["Not Found "],
    "image": "Not Found",
    "meaning_key": "Not Found",
    "voice": "Not Found"
}




const ResultSearchContainer = ({dataSearch, khoahoc}) => {

    // const currentKhoahoc = khoahoc ? khoahoc[0] : dummy
    let currentKhoahoc = dummy
    
    if(khoahoc && khoahoc[0]){
        currentKhoahoc = khoahoc[0]
    } else {
        currentKhoahoc = dummy
    }
        
        const { currentData, handleInputChange} = useForm({
            currentWorkId: '',
            currentWorkTitle: '',
            currentMeaning: '',
            currentExample: '',
            currentImage: '',
            currentVoice: ''
        })
        
        const handleEdit = () => {
        }
        
    console.log('khoahoc', khoahoc)
    console.log('currentKhoahoc', currentKhoahoc)

    const [currentWorkId, setCurrentWorkId] = useState(currentKhoahoc.workId)
    const [currentWorkTitle, setCurrentWorkTitle] = useState(currentKhoahoc.workTitle)
    const [currentMeaning, setCurrentMeaning] = useState(currentKhoahoc.meaning)
    const [currentExample, setCurrentExample] = useState(currentKhoahoc.example)
    const [currentImage, setCurrentImage] = useState(currentKhoahoc.image)
    const [currentVoice, setCurrentVoice] = useState(currentKhoahoc.voice)


    const handleInputChangeWorkId = (text) => {
        setCurrentWorkId(text)
    }

    const handleInputChangeWorkTitle = (text) => {
        setCurrentWorkTitle(text)
    }

    const handleInputChangeMeaning = (text) => {
        setCurrentMeaning(text)
    }

    const handleInputChangeExample = (text) => {
        setCurrentExample(text)
    }

    const handleInputChangeImage = (text) => {
        setCurrentImage(text)
    }

    const handleInputChangeVoice = (text) => {
        setCurrentVoice(text)
    }


    const handleRefresh = () => {
        setCurrentWorkId(currentKhoahoc.workId)
        setCurrentWorkTitle(currentKhoahoc.workTitle)
        setCurrentMeaning(currentKhoahoc.meaning)
        setCurrentExample(currentKhoahoc.example)
        setCurrentImage(currentKhoahoc.image)
        setCurrentVoice(currentKhoahoc.voice)
    }


    return(
        <Row>
            <Col md="4">
                    {<h3>Searching {dataSearch.SearchData} ...</h3>}
                </Col>
                <Col md="8">
                <Form>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentWorkId">Work ID: <strong>{currentWorkId}</strong></Label>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentWorkTitle">Work Title</Label>
                            <Input type="text"  id="currentWorkTitle" onChange={(e) => handleInputChangeWorkTitle(e.target.value)} value={currentWorkTitle}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentMeaning">Meaning</Label>
                            <Input type="text"  id="currentMeaning" onChange={(e) => handleInputChangeMeaning(e.target.value)} value={currentMeaning}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentExample">Example</Label>
                            <Input type="text"  id="currentExample" onChange={(e) => handleInputChangeExample(e.target.value)} value={currentExample}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentImage">Image</Label>
                            <Input type="text"  id="currentImage" onChange={(e) => handleInputChangeImage(e.target.value)} value={currentImage}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentVoice">Voice</Label>
                            <Input type="text"  id="currentVoice" onChange={(e) => handleInputChangeVoice(e.target.value)} value={currentVoice}></Input>
                        </Row>
                    </Col>

                    <Col md="8">
                        <Button onClick={handleEdit} color="danger" className="mt-4">
                            Change Data
                        </Button>
                        <Button style={{marginLeft:'15px'}} onClick={handleRefresh} color="primary" className="mt-4">
                            Refresh Data
                        </Button>
                    </Col>
                </Form>
                </Col>
        </Row>
        
  )
}

const mapStateToProps = (state) =>{
    return{
        profile: state.firebase.profile,
        course: state.firestore.ordered.course,
        khoahoc: state.firestore.ordered.khoahoc,
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    ({dataSearch}) => [
        {
            collection: `${dataSearch.CourseSelect}`,
            where: ['workId', '==', `${dataSearch.SearchData}`],
            storeAs: 'khoahoc'
        }
    ]    
))(ResultSearchContainer);