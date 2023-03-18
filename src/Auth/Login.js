import React, { useState } from 'react'
import {Row, Col, Container, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import '../App.css'
import {Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import {signIn} from '../Store/actions/authActions';
import Footer from '../Components/Footer/Footer'
import CustomAlert from '../Components/Alert'
import useStyle from './style';
import LockIcon from '@material-ui/icons/Lock';

function Login(props) {
    const [input, setInput] = useState({
      email: '',
      password: '',
    });
    const [errors, setErrors] = useState({});
    const classes = useStyle();
  
    const handleChange = (e) => {
      setInput({
        ...input,
        [e.target.id]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.id]: '',
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        props.signIn(input);
      }
    };
  
    const validate = () => {
      let errors = {};
      let isValid = true;
  
      if (!input['email']) {
        isValid = false;
        errors['email'] = 'Please enter your email';
      }
  
      if (!input['password']) {
        isValid = false;
        errors['password'] = 'Please enter the password';
      }
  
      setErrors(errors);
  
      return isValid;
    };
  
    const { auth, authError } = props;
    if (auth.uid) return <Redirect to="/" />;
    return (
        <div className="pos-rel w-100vw h-100vh">
            <div className="transform-center">
                <Row className={`${classes.root} flex-col`}>
                    <Col md="12">
                    <Form onSubmit={handleSubmit}>
                        <Container className="signup-container">
                            <div className="flex-col" style={{alignItems: 'center'}}>
                                <div className={classes.avtWrap}>
                                <img
                                    className={`${classes.avt} w-100 h-100`}
                                    src="https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/logo_thtt.png?alt=media&token=aee95558-de2a-4527-bc48-d526f5ecc9d2"
                                    alt="Avatar Photo"
                                />
                                </div>
                            </div>
                            <div className="flex-col">
                                <h1 className={`${classes.title} t-center`}>Đăng nhập</h1>
                                <div className="t-center mt-5">
                                <LockIcon className={classes.labelIcon} />
                                </div>
                            </div>
                            <div className="flex-col">
                                <Col>
                                    <Row md="12">
                                        <FormGroup className={`${classes.form}`}>
                                            <Label>Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="Email" className={`${classes.label}`} onChange={handleChange} />
                                            {errors.email && <p className="error">{errors.email}</p>}
                                        </FormGroup>
                                    </Row>
                                    <Row md="12">
                                        <FormGroup className={`${classes.form}`}>
                                            <Label>Mật khẩu</Label>
                                            <Input type="password" name="password" id="password" placeholder="Password" className={`${classes.label}`} onChange={handleChange} />
                                            {errors.password && <p className="error">{errors.password}</p>}
                                        </FormGroup>
                                    </Row>
                                </Col>
                            </div>
                            <Button
                                className={`${classes.button} t-center _btn _btn-primary`}
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large">
                                Đăng nhập
                            </Button>
                            <p className="login-helper">
                                Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
                            </p>
                            {authError && <CustomAlert color="danger" alert={authError} authError />}
                        </Container>
                    </Form>
                    </Col>
                </Row>
                </div>
                {/* footer */}
                <Footer />
        </div>
    );
  }

const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        signIn : (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
