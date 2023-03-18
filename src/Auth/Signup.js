import React, {useState} from 'react'
import {Row, Col, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import '../App.css'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {signUp} from '../Store/actions/authActions';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Footer from '../Components/Footer/Footer'
import CustomAlert from '../Components/Alert'
import useStyle from './style';

function Signup(props){
 
    const [input, setInput] = useState({
        email: '',
        name: '',
        password: '',
        type: 'Student',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const classes = useStyle();

    const handleChange = (e) => {
        const newInput = { ...input };
        const newErrors = { ...errors };
        newInput[e.target.name] = e.target.value.trim();
        newErrors[e.target.name] = '';
        setInput(newInput);
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
        props.signUp(input);
        }
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        
        if (!input['email']) {
          isValid = false;
          newErrors['email'] = 'Please enter your email address';
        }
        
        if (typeof input['email'] !== 'undefined') {
          var pattern = new RegExp(
            /^(([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );
          if (!pattern.test(input['email'])) {
            isValid = false;
            newErrors['email'] = 'Please enter valid email address.';
          }
        }
        
        if (!input['password']) {
          isValid = false;
          newErrors['password'] = 'Please enter your password.';
        }
        
        if (!input['name']) {
          isValid = false;
          newErrors['name'] = 'Please enter your name.';
        }
        if (!input['phone']) {
          isValid = false;
          newErrors['phone'] = 'Please add your phone number';
        }
        
        setErrors(newErrors);
        
        return isValid;
    };

    const { auth, authError } = props;
    if (auth.uid) return <Redirect to='/'></Redirect>;

    return(
        <div className="pos-rel w-100vw h-100vh">
    <Row className={`${classes.rootSignup} flex-col`}>
        <Col md="12">
            <Form onSubmit={handleSubmit}>
            <Container className="signup-container">
                <div className="flex-col">
                    <h1 className={`${classes.title} t-left`}>Đăng ký</h1>
                    <div className="t-center mt-5">
                    </div>
                </div>
            <Row className="mt-4 mb-4">
                <Col md='5'>
                    <FormGroup className={`${classes.form}`}>
                        <Label>Tên</Label>
                        <Input type="text" name="name" id="name" placeholder="Họ và tên" className={`${classes.label}`} onChange={handleChange}/>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </FormGroup>
                </Col>
                <Col md='5'>
                    <FormGroup className={`${classes.form}`}>
                        <Label>Email</Label>
                        <Input name="email" id="email" placeholder="Email" className={`${classes.label}`} onChange={handleChange} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </FormGroup>
                </Col>
                <Col md='5' className="mt-3">
                    <FormGroup className={`${classes.form}`}>
                        <Label>Mật khẩu</Label>
                        <Input type="password" name="password" id="password" className={`${classes.label}`} placeholder="Password" onChange={handleChange} />                        
                        {errors.password && <p className="error">{errors.password}</p>}
                    </FormGroup>
                </Col>
                <Col md='5' className="mt-3">
                    <FormGroup className={`${classes.form}`}>
                        <Label>Số điện thoại</Label>
                        <Input type="text" name="phone" id="phone" placeholder="Phone" className={`${classes.label}`} onChange={handleChange} />                        
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </FormGroup>
                </Col>
                <Col md='5' className="mt-3 mb-0"> 
                    <Label for="exampleSelect">Giới tính</Label>
                    <Row>
                    <Col>
                        <FormGroup check>
                        <Input type="radio" name="gender" value="male" id="male" className={`${classes.radio}`} onChange={handleChange}/>
                        <Label check for="male">
                            Nam
                        </Label>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup check>
                        <Input type="radio" name="gender" value="female" id="female" className={`${classes.radio}`} onChange={handleChange}/>
                        <Label check for="female">
                            Nữ
                        </Label>
                        </FormGroup>
                    </Col>
                    </Row>
                </Col>
                <Col md='5' className="mt-3 mb-0"> 
                <Label for="exampleSelect">Bạn là</Label>
                    <Row>
                    <Col>
                        <FormGroup check>
                        <Input type="radio" name="type" value="Student" id="student" className={`${classes.radio}`} onChange={handleChange}/>
                        <Label check for="student">
                            Học sinh
                        </Label>
                        </FormGroup>
                    </Col>
                    </Row>
                </Col>
            </Row>
            <Button color="primary" className={`${classes.buttonSign} signup-button`} type="submit">Đăng ký</Button>
            <p className="login-helper">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            {authError && <CustomAlert authError alert={authError}></CustomAlert>}
            </Container> 
            </Form> 
        </Col>
     </Row>

     <Footer/>
     </div>
    )
  
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile, 
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        signUp: (newUser) => {
            dispatch(signUp(newUser))
        }
    })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), 
firestoreConnect([{collection: 'branches'},     {
    collection: 'semesters',
    doc: 'SemesterDoc',
}]))(Signup);

