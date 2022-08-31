import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, Form, FormGroup } from 'reactstrap'
import { addNewCourse, addNewCourseList } from '../../Store/actions/courseActions'
import { connect } from 'react-redux'
import { addStudent } from '../../Store/actions/authActions'

const AddStudentForm = ({addStudent}) => {

    const dummy = {
        name: "",
        email: "",
        password: "",
        phone: "",
        type: "student"
    }

    const err = {
        name: "",
        email: "",
        phone: "",
        password: ""
    }

    const [studentInfo, setStudentInfo] = useState(dummy)
    const [errors, setErrors] = useState(err)

    const validateEmail = () => {

        if(studentInfo.email == ''){
            setErrors({
            ...errors,
            email: "Please enter your email address."
        })}
        else{ setErrors({
            ...errors,
            email: ""
        })}

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(studentInfo.email)) {
            setErrors({
            ...errors,
            email: "Please enter valid email address."
        })
        }else{
            setErrors({
                ...errors,
                email: ""
            })
        }
    }

    const handleFileUpload =  () => {
        validateEmail()

        if(errors.email == '') {
            addStudent(studentInfo)
        }
    }

    console.log('student', studentInfo);
    console.log('errors', errors);

    return(
        <Form>
            <Container>
                <Row md="12">
                    <Col>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="" id="name" value={studentInfo.name}
                                onChange={(e) => {
                                    setStudentInfo({
                                        ...studentInfo,
                                        name: e.target.value
                                    })}}>
                            </Input>
                        </FormGroup>

                    </Col>
                </Row>
                <Row md="12">
                    <Col>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="email" id="email" value={studentInfo.email}
                            onChange={(e) => {
                                setStudentInfo({
                                    ...studentInfo,
                                    email: e.target.value
                                })}}>
                        </Input>
                        {errors.email != '' && <p className="error">{errors.email}</p>}
                    </Col>
                </Row>
                <Row md="12">
                    <Col>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            type="" id="password" value={studentInfo.password}
                            onChange={(e) => {
                                setStudentInfo({
                                    ...studentInfo,
                                    password: e.target.value
                                })}}>
                        </Input>
                    </Col>
                </Row>
                <Row md="12">
                    <Col>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                            type="phone" id="phone" value={studentInfo.phone}
                            onChange={(e) => {
                                setStudentInfo({
                                    ...studentInfo,
                                    phone: e.target.value
                                })}}>
                        </Input>

                    </Col>
                </Row>
                {
                    studentInfo.name != '' && studentInfo.password != '' && studentInfo.phone != '' ?
                    <Button color="primary" className="mt-3 mb-3" onClick={() => handleFileUpload()}>Add Student</Button> :
                    <Button disabled color="primary" className="mt-3 mb-3" onClick={() => handleFileUpload()}>Add Student</Button>
                }
                
            </Container>
        </Form>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addStudent: (studentInfo) => {
            dispatch(addStudent(studentInfo))
        }
    })
}


export default connect(null, mapDispatchToProps)(AddStudentForm);