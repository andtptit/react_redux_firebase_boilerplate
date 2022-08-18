import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, CardImg, CardText, CardHeader, Container} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../../Components/Modal'
import { removeCourse, addLearned } from '../../Store/actions/courseActions'
import { NavLink } from 'react-router-dom'
import './Card.css'
import FlashCardDetail from '../../Dashboards/student/pages/FlashCardDetail'



const FlashCard = ({course, dataCourse, addLearned, profile, objDataCourseRemind, objDataCourseNew}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataFlash, setDataFlash] = useState({})
    
    const handleCourseRemoval = (course) => {
        removeCourse(course)
        setIsOpen(false)
    }
    const profileX = profile.SRN

    useEffect(() => {
        console.log('set dataflash 1')
        setDataFlash(objDataCourseNew ? objDataCourseNew[Math.floor(Math.random() * objDataCourseNew.length)] : undefined)
    }, [objDataCourseNew != null])

    let datenow = Date.now()

    const handleLearn = () => {
        addLearned(course, dataFlash, profileX, datenow)
        console.log('set dataflash 2')
        // setDataFlash(objDataCourseNew ? objDataCourseNew[Math.floor(Math.random() * objDataCourseNew.length)] : undefined)
    }

    const handleNextDataFlash = () => {
        setDataFlash(objDataCourseNew ? objDataCourseNew[Math.floor(Math.random() * objDataCourseNew.length)] : undefined)
    }
    
    const cardImage = "https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/frames%2Fmonday.png?alt=media&token=dec9070d-89a5-471c-974c-f995805dbc9e"

    return(
        <React.Fragment>
            <Col style={{marginTop: 15}}  md="2">
                {dataFlash ? '' : <h3>Bạn đã hoàn thành khóa học này!</h3>}
            </Col>
            {
                dataFlash ? 
                    <Row className='card-center' md="4">
                        <Button color="primary" className="button navy"  onClick={handleLearn} >Đã học</Button>
                        <Button  onClick={handleNextDataFlash} className="button mt-2" color="primary">Từ vựng tiếp theo</Button>
                    </Row>
            : '' }
            <Row md="12">
                <Col md='6' >
                    <Card style={{minHeight: '250px'}} className="course-card" body outline color="info">
                    <CardHeader className="course-t">개념 [개ː념]<strong></strong></CardHeader>
                    <CardImg top width="100%" src="https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/images%2Fkit_background_3.png?alt=media&token=82bba651-74e1-47e1-9546-4cdf288684f1" alt="Card image cap" />
                        <CardBody>
                            {/* <CardText className="mb-2 subtitle">ID khóa học: <strong>{currentCourse.courseId || dummy.courseId}</strong></CardText>  */}
                            <CardText className="mb-2 subtitle">[槪念] khái niệm</CardText>
                            <CardText className="mb-2 subtitle"> 개념이 없다: không có khái niệm <br />
                            개념을 정의하다: định nghĩa khái niệm</CardText>
                            <CardText className="mb-2 subtitle"></CardText>
                            <Col style={{paddingLeft: '0'}} md="6">
                                <Button color='success' className='mt2'>Đã học</Button>
                                <Button color='primary' className='ml-2 mt2'>Từ tiếp theo</Button>

                            </Col>
                        </CardBody>
                    </Card> 
                    <CustomModal itle="Remove Course">
                        <Container>
                            <h4>Are you sure?</h4>
                            <Button color="danger" className="card-button w-25" >Yes</Button>
                            <Button color="primary" className="card-button w-25 ml-2 mr-2" >No</Button>
                        </Container>
                    </CustomModal>
                </Col>
            </Row>
            <Row className='card-center' md="12">
                <h4>{dataFlash && dataFlash.voice}</h4>
                <div className="card-custom has-bg-img" style={{backgroundImage: `url(${cardImage})`}}>
                    <div className="card__content">
                        <span className="card__title">개념 [개ː념]</span>
                        <span className="card__sub-meaning">[槪念] khái niệm</span>
                        <span className="card__meaning">
                        </span>
                        <br />
                        <span className="card__example">
                            개념이 없다: không có khái niệm <br />
                            개념을 정의하다: định nghĩa khái niệm
                        </span>
                    </div>
                    
                </div>
            </Row>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        courses: state.firestore.ordered.courses,
        sortedByBranch: state.firestore.ordered.sortedByBranch,
        dataCourse: state.firestore.ordered.dataCourse,
        auth: state.firebase.auth,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        addLearned: (course, dataCourse, profileX, datenow) => {
            dispatch(addLearned(course, dataCourse, profileX, datenow))
        }
    })
}


// mai update cau lenh query
export default compose(
    firestoreConnect((props) => {
      return ([
        {
            collection: props.course ? `${props.course[0].courseId}` : 'khoahoc',
            where: [['image', '!=', '']],
            storeAs: 'dataCourse'
        }
      ])
    }),
    connect(mapStateToProps, mapDispatchToProps),
)(FlashCard)
