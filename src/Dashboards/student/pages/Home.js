import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Row, Container, Col, CardTitle, CardText, Button } from 'reactstrap';
import { compose } from 'redux';
import Notification from '../../../Components/Notification';
import Slider from '../../../Components/Slider';



const TeacherOverview = ({profile, listcourse}) => {
    
    const profileX = profile.SRN
    let objCourseNew = []
    let objCourseLearned = []
    if(listcourse) {
        console.log("render")
        for ( var index=0; index<listcourse.length; index++ ) {
            if (listcourse[index] && Object.keys(listcourse[index].studentLearned).includes(profileX)) {
                objCourseLearned.push(listcourse[index])
            } else {
                objCourseNew.push(listcourse[index])
            }
        }
    }

    return(
        <Container className="mt-4 mb-4 card-container__custom">
        <Row>
            <Slider></Slider>
            <Col md="12">
                <div className="header__custom">
                <h4>Học tập</h4>
                </div>
            </Col>
            <Col md="6">
                <div className='home_course__group'>
                    <h5>
                        Khóa học: {listcourse && listcourse.length}
                    </h5>
                </div>
            </Col>
            <Col md="6">
                <div className='home_course__group'>
                    <h5>
                        Đã học: {objCourseLearned && objCourseLearned.length}
                    </h5>
                </div>
            </Col>
            <Col md="12">
                <div className='home_course__group'>
                    <h5>
                        Khóa học gần nhất:
                    </h5>
                </div>
            </Col>
        </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile, 
        listcourse: state.firestore.ordered.listcourse,
    }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) =>
{
    console.log('props', props)
    return [
        {
            collection: 'courses',
            storeAs: 'listcourse'
        },
    ]
} ))(TeacherOverview);