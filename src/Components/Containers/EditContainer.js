import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Row, Form, Label, Input } from 'reactstrap'
import useForm from '../../Hooks/useForm'
import { compose } from 'redux'
import Axios from 'axios'
import ResultSearchContainer from './ResultSearchContainer'


const EditContainer = ({listcourse}) => {

    const { inputs, handleInputChange} = useForm({SearchData: '', CourseSelect: 'all'})
    console.log(inputs);

    const [isResultSearchOpen, setIsResultSearchOpen] = useState(false)

    const handleSearch = () => {
        setIsResultSearchOpen(true)
    }

    return(
        <Row>
            <Col md="12">
                <h4>Chỉnh sửa kho dữ liệu</h4>
            </Col>
            <Col md="4">
                <Form >
                        <Col>
                            <Row className="mt-2">
                                <Label htmlFor="SearchData">Work Title or Work Id</Label>
                                <Input type="text"  id="SearchData" value={inputs.SearchData} onChange={handleInputChange}></Input>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="mt-2">
                                <Label htmlFor="CourseSelect">Select Course</Label>
                                <Input type="select" className="selector" name="select" id="CourseSelect" value={inputs.CourseSelect} onChange={handleInputChange}>
                                    <option defaultValue='all' value='all'>All Course</option>
                                    {listcourse && listcourse.map((courseX, index) => (
                                        <option key={index} value={courseX.courseId}>{courseX.title}</option>
                                    ))}

                                </Input>
                            </Row>
                        </Col>
                        <Button onClick={handleSearch} color="primary" className="mt-4">
                            Search
                        </Button>
                </Form>
            </Col>
            <Col md="8">
                {isResultSearchOpen ? <ResultSearchContainer dataSearch={inputs} listcourse={listcourse} /> : <h3>Not Found</h3>}
            </Col>
        </Row>
        
  )
}

const mapStateToProps = (state) =>{
    return{
        profile: state.firebase.profile,
        course: state.firestore.ordered.course,
        listcourse: state.firestore.ordered.listcourse,
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    () => [
        {
            collection: 'courses',
            where: ['courseId', '!=', ''],
            storeAs: 'listcourse'
        }
    ]    
))(EditContainer);