import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, CardImg, CardText} from 'reactstrap'
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
    }, [objDataCourseNew != null, objDataCourseNew])

    let datenow = Date.now()

    const handleLearn = () => {
        addLearned(course, dataFlash, profileX, datenow)
        console.log('set dataflash 2')
        // setDataFlash(objDataCourseNew ? objDataCourseNew[Math.floor(Math.random() * objDataCourseNew.length)] : undefined)
    }
    
    const cardImage = "https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/frames%2Fsunday.png?alt=media&token=fae0c35d-951f-49e8-9ce8-376b72fbc64a"

    console.log('flash', dataFlash && dataFlash.voice)

    return(
        <React.Fragment>
            <Col style={{marginTop: 15}}  md="2">
                <Button  onClick={handleLearn} className="button" color="primary">Đã học</Button>
            </Col>

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
