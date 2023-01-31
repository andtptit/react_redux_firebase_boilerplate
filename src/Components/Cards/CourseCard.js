import React, { useState } from 'react'
import {Card, CardBody, CardImg, Button, Row, Col, CardSubtitle, Container, CardHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../../Components/Modal'
import { removeCourse, removeDataCourse } from '../../Store/actions/courseActions'
import CustomBreadcurmb from '../Breadcrumb'



const CourseCard = ({courses, removeCourse, removeDataCourse, admin, profile}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleCourseRemoval = (course) => {
        removeCourse(course)
        removeDataCourse(course)
        setIsOpen(false)
    }

    const toggle = () => setIsOpen(!isOpen)

    const profileX = profile.SRN
    let objCourseNew = []
    let objCourseLearned = []
    if(courses) {
      for ( var index=0; index<courses.length; index++ ) {
        if (courses[index] && Object.keys(courses[index].studentLearned).includes(profileX)) {
            objCourseLearned.push(courses[index])
        } else {
            objCourseNew.push(courses[index])
        }
      }
    }

    const str_href = window.location.pathname
    const url_bred = str_href.split("/")

    return(
        <React.Fragment>
            <CustomBreadcurmb url_bred={url_bred}/>
            <div className='card-container__custom'>
            {admin ? "" :
                <Row md="12">
                    <Col md='12'>
                        <div className='header__custom header__courses'>
                            <h4>Khóa bạn đang học</h4>
                        </div>
                    </Col>
                    {objCourseLearned && objCourseLearned.slice(0, 8).map((c) =>
                        <Col className='pr-2 pl-2' md='3' xs='6' key={c.id}>
                            <Card className="course-card course-card__custom" body outline color="info">
                            <CardImg height={"100px"} top src={c.imgUrl} alt="Card image cap" />
                            <CardHeader className="course-title card-header__custom"><strong>{c.title}</strong></CardHeader>
                            <CardBody className='card-body__custom'>
                                <CardSubtitle className="mb-2 subtitle">Số lượng từ vựng: {c.courseLength}</CardSubtitle>
                                <Button  className="mt-2 card-button__custom continue">
                                    <a href={`/courses/${c.courseId}`} className="link">
                                        Tiếp tục học
                                    </a>
                                </Button>
                            </CardBody>
                            </Card>
                        </Col>
                    )}
                </Row>
            }
            <Row md="12">
                <Col md='12'>
                    <div className='header__custom header__courses'>
                        <h4>Danh sách các khóa học</h4>
                    </div>
                </Col>
                {objCourseNew && objCourseNew.slice(0, 8).map((c) =>
                    <Col className='pr-2 pl-2' md='3' xs='6' key={c.id}>
                        <Card className="course-card course-card__custom" body outline color="info">
                        <CardImg top src={c && c.imgUrl} alt="Card image cap" />
                        <CardHeader className="course-title card-header__custom"><strong>{c.title}</strong></CardHeader>
                        <CardBody className='card-body__custom'>
                            <CardSubtitle className="mb-2 subtitle">Số lượng từ vựng: {c.courseLength}</CardSubtitle>
                            <Button  className="mt-2 card-button__custom new">
                                <a href={`/courses/${c.courseId}`} className="link">
                                    {admin ? 'Xem khóa học' : 'Học ngay'}
                                </a>
                            </Button>
                            {admin ? <Button className="mt-2 card-button__custom" onClick={toggle} color="danger"> Remove </Button> : undefined}
                        </CardBody>
                        </Card> 
                        <CustomModal toggle={toggle} modal={isOpen} title="Remove Course">
                            <Container>
                                <h4>Are you sure?</h4>
                                <Button color="danger" className="card-button w-25" onClick={() => handleCourseRemoval(c)}>Yes</Button>
                                <Button color="primary" className="card-button w-25 ml-2 mr-2" onClick={toggle}>No</Button>
                            </Container>
                        </CustomModal>
                    </Col>
                )}
            </Row>
            </div>
        </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    console.log(state)
    return{
        courses: state.firestore.ordered.courses,
        profile: state.firebase.profile
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        removeCourse: (course) => {
            dispatch(removeCourse(course))
        },
        removeDataCourse: (course) => {
            dispatch(removeDataCourse(course))
        }
    })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) =>
    {
        let courseDetail = props.courses && props.courses[0] ? props.courses[0].courseId : 'courseNull'
        return [
            {
                collection: 'courses',
                storeAs: 'courses'
            },
            {
                collection: courseDetail,
                storeAs: 'courseDetail_' + courseDetail
            }

        ]
    }
))(CourseCard);
