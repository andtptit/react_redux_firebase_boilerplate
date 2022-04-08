import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Row, Form, Label, Input } from 'reactstrap'
import useForm from '../../Hooks/useForm'
import { compose } from 'redux'
import { updateDataCourse } from '../../Store/actions/courseActions'


const dummy = {
    "wordId": "Not Found",
    "wordTitle": "Not Found",
    "meaning": "Not Found",
    "example": ["Not Found "],
    "image": "Not Found",
    "meaning_key": "Not Found",
    "voice": "Not Found"
}

const ResultSearchContainer = ({dataSearch, courseSelectData, updateDataCourse}) => {

    let currentKhoahoc = dummy
    
    if(courseSelectData && courseSelectData[0]){
        currentKhoahoc = courseSelectData[0]
    } else {
        currentKhoahoc = dummy
    }
        
    
    const handleChangeData = () => {
        updateDataCourse(currentData, dataSearch)
    }
        
    console.log('courseSelectData', courseSelectData)
    console.log('currentKhoahoc', currentKhoahoc)

    const [currentData, setCurrentData] = useState(currentKhoahoc || dummy)

    useEffect(() => {
        setCurrentData(currentKhoahoc)
    },[currentKhoahoc, dataSearch])


    const handleInputChangeWordTitle = (text) => {
        setCurrentData((prev) => {
            return {...prev,'wordTitle': text}
        })
    }
    console.log('currentData', currentData)

    const handleInputChangeMeaning = (text) => {
        setCurrentData((prev) => {
            return {...prev,'meaning': text}
        })
    }

    const handleInputChangeExample = (text) => {
        setCurrentData((prev) => {
            return {...prev,'example': text}
        })
    }

    const handleInputChangeImage = (text) => {
        setCurrentData((prev) => {
            return {...prev,'image': text}
        })
    }

    const handleInputChangeVoice = (text) => {
        setCurrentData((prev) => {
            return {...prev,'voice': text}
        })
    }


    const handleRefresh = () => {
        setCurrentData(currentKhoahoc)
    }

    return(
        <Row>
            <Col md="4">
                    {dataSearch.CourseSelect == 'all' ? <h4>Search data function coming soon</h4> : <h4>Searching {dataSearch.SearchData} ...</h4>}
                </Col>
                <Col md="8">
                <Form>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentWordId">Work ID: <strong>{currentData.wordId}</strong></Label>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentWordTitle">Work Title</Label>
                            <Input type="text"  id="currentWordTitle" onChange={(e) => handleInputChangeWordTitle(e.target.value)} value={currentData.wordTitle}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentMeaning">Meaning</Label>
                            <Input type="text"  id="currentMeaning" onChange={(e) => handleInputChangeMeaning(e.target.value)} value={currentData.meaning}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentExample">Example</Label>
                            <Input type="text"  id="currentExample" onChange={(e) => handleInputChangeExample(e.target.value)} value={currentData.example}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentImage">Image</Label>
                            <Input type="text"  id="currentImage" onChange={(e) => handleInputChangeImage(e.target.value)} value={currentData.image}></Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mt-2">
                            <Label htmlFor="currentVoice">Voice</Label>
                            <Input type="text"  id="currentVoice" onChange={(e) => handleInputChangeVoice(e.target.value)} value={currentData.voice}></Input>
                        </Row>
                    </Col>

                    <Col md="8">
                        <Button onClick={() => handleChangeData()} color="danger" className="mt-4">
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
        courseSelectData: state.firestore.ordered.courseSelectData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateDataCourse: (courseSelectData, dataSearch) => {
            dispatch(updateDataCourse(courseSelectData, dataSearch))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
    ({dataSearch}) => [
        {
            collection: `${dataSearch.CourseSelect}`,
            where: ['wordId', '==', `${dataSearch.SearchData}`],
            storeAs: 'courseSelectData'
        },
        {
            collection: `${dataSearch.CourseSelect}`,
            where: ['wordTitle', '==', `${dataSearch.SearchData}`],
            storeAs: 'courseSelectData'
        }
    ]    
))(ResultSearchContainer);