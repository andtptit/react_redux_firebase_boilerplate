import React, { useState } from 'react'
import {Card, CardBody, CardImg, Button, Row, Col, CardSubtitle, Container, CardHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../../Components/Modal'
import { removeCourse, removeDataCourse } from '../../Store/actions/courseActions'
import { NavLink } from 'react-router-dom'



const CourseCard = ({courses, branch, sortedByBranch, removeCourse, removeDataCourse, admin}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleCourseRemoval = (course) => {
        removeCourse(course)
        removeDataCourse(course)
        setIsOpen(false)
    }

    const toggle = () => setIsOpen(!isOpen)

    const sortedCourses =  branch === "All Branches" ? courses : sortedByBranch;

    return(
        <React.Fragment>
        <Row md="12">
            {sortedCourses && sortedCourses.map((c) =>
                    <Col md='4' key={c.id}>
                        <Card className="course-card" body outline color="info">
                        <CardHeader className="course-t">Tên Khóa Học: <strong>{c.title}</strong></CardHeader>
                            <CardBody>
                                <CardSubtitle className="mb-2 subtitle">ID khóa học: <strong>{c.courseId}</strong></CardSubtitle> 
                                <CardSubtitle className="mb-2 subtitle">Số lượng từ vựng: {c.courseLength}</CardSubtitle>
                                <Button  color="primary" className="mr-3">
                                    <a href={`/courses/${c.title}`} className="link">
                                        {admin ? 'Xem hóa học' : 'Học ngay'}
                                    </a>
                                </Button>
                                {admin ? <Button onClick={toggle} color="danger"> Remove </Button> : undefined}
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
        </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    console.log(state)
    return{
        courses: state.firestore.ordered.courses,
        sortedByBranch: state.firestore.ordered.sortedByBranch
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
                collection: 'courses',
                where: ['branch', '==', `${props.branch}`],
                storeAs: 'sortedByBranch'
            },
            {
                collection: courseDetail,
                storeAs: 'courseDetail_' + courseDetail
            }

        ]
    }
))(CourseCard);
