import React, { useEffect, useState } from 'react'
import {Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, CardImg, CardText} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../../Components/Modal'
import { removeCourse, addLearned } from '../../Store/actions/courseActions'
import { NavLink } from 'react-router-dom'
import './Card.css'



const FlashCard = ({course, dataCourse, addLearned, profile}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dataFlash, setDataFlash] = useState()
    const [cntNewWord, setCntNewWord] = useState(0)
    const [cntWordRemind, setCntWordRemind] = useState(0)

    const [dataCourseNew, setDataCourseNew] = useState([])
    const [dataCourseRemind, setDataCourseRemind] = useState([])
    
    const handleCourseRemoval = (course) => {
        removeCourse(course)
        setIsOpen(false)
    }

    useEffect(() => {
        setDataFlash(dataCourse ? dataCourse[Math.floor(Math.random() * dataCourse.length)] : undefined)
        setCntNewWord(dataCourse ? dataCourse.length: 0)

        if(dataCourse) {
            for (const element of dataCourse) {
                if(!Object.keys(element.learned).includes(profile)) {
                    setDataCourseNew(pre =>{
                        const newDataCourseNew = [...pre, element]
                        return newDataCourseNew
                      })
                } else {
                    setDataCourseRemind(pre =>{
                        const newDataCourseRemind = [...pre, element]
                        return newDataCourseRemind
                      }
                    )
                }
            }
        }
    },[dataCourse])

    useEffect(() => {
        setCntWordRemind(dataCourseRemind ? dataCourseRemind.length: 0)
    },[dataCourseRemind])

    let datenow = Date.now()

    const handleLearn = () => {
        console.log('dataFlash', dataFlash)
        addLearned(course, dataFlash, profile, datenow)
    }
    console.log('dataCourseNew', dataCourseNew)
    console.log('dataCourseRemind', dataCourseRemind)
    

    const cardImage = "https://firebasestorage.googleapis.com/v0/b/flash-kid-9364b.appspot.com/o/frames%2Fsunday.png?alt=media&token=fae0c35d-951f-49e8-9ce8-376b72fbc64a"

    return(
        <React.Fragment>
            <Col style={{marginTop: 15}}  md="2">
                <Button  onClick={handleLearn} className="button" color="primary">Đã học</Button>
            </Col>
            <Row className='card-center' md="12">
                <h2>{dataCourseRemind && JSON.stringify(dataCourseRemind)}</h2>
                <h2>Số từ bạn đã học: {cntWordRemind}</h2>
                <h2>Tổng số từ: {cntNewWord}</h2>
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
        addLearned: (course, dataCourse, profile, datenow) => {
            dispatch(addLearned(course, dataCourse, profile, datenow))
        }
    })
}


// mai update cau lenh query
export default compose(
    firestoreConnect((props) => {
      // added this console log to verify that ownProps.contestId exists.
      return ([
        // {
        //     collection: `${props.course[0].courseId}`,
        //     // where: ['learned', 'array-contains', objects],
        //     where: [`${xxx}` ,'<=', datenow],
        //     storeAs: 'dataCourseRemind'
        // },
        {
            collection: `${props.course[0].courseId}`,
            // where: ['learned', 'array-contains', objects],
            where: [['image', '!=', '']],
            // where: [['workId', '!=', null]],
            storeAs: 'dataCourse'
        }
      ])
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(FlashCard)
