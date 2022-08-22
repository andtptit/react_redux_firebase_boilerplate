import React, { useEffect, useRef, useState } from "react";
import "./FlashCardArray.css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Card, CardBody, CardImg, Row, Col, CardSubtitle, Container, CardHeader, Button, Progress, CardText} from 'reactstrap'
import { addLearned } from '../../Store/actions/courseActions'
import { CircularProgressbar } from 'react-circular-progressbar';
import {Restart, Shuffle} from '@carbon/icons-react'
import { Icon } from "@carbon/icons-react";



const FlashCardArray = ({course, profile, dataCourse, addLearned}) => {

  const profileX = profile.SRN
  let datenow = Date.now()

  const [currentCard, setCurrentCard] = useState({})
  const [cardNum, setCardNum] = useState(0)
  const [isFlip, setIsFlip] = useState(true)
  const [percent, setPercent] = useState(0)
  const [percentNum, setPercentNum] = useState(0)


  let objDataCourseNew = []
  let objDataCourseRemind = []
  if(dataCourse) {
    for ( var index=0; index<dataCourse.length; index++ ) {
      if (dataCourse[index] && Object.keys(dataCourse[index].learned).includes(profileX)) {
        objDataCourseRemind.push(dataCourse[index])
      } else {
        objDataCourseNew.push(dataCourse[index])
      }
    }
  }


  useEffect(() => {
    if(objDataCourseRemind, dataCourse) {
      setPercent(objDataCourseRemind.length / dataCourse.length * 100)
    }
  },[objDataCourseRemind]);

  useEffect(() => {
    dataCourse && setPercentNum(cardNum/ dataCourse.length * 100)
  },[cardNum]);


  const handlePrevCard = () => {
    setCardNum(cardNum - 1)
  }

  const handleNextCard = () => {
    addLearned(course, currentCard, profileX, datenow)
    setCardNum(cardNum + 1)
  }

  const handleChangeClass = () => {
    setIsFlip(!isFlip)
  }

  let arr_index = []
  useEffect(() => {
    for (let i = dataCourse && dataCourse.length - 1; i >= 0; i--) {
      arr_index.push(i)
    }
    
    arr_index = arr_index.sort(() => Math.random() - 0.5)
    console.log('shuffled', arr_index)
    dataCourse && setCurrentCard(dataCourse[arr_index[cardNum]])

  }, [dataCourse != undefined, cardNum])



  console.log('datacourse', dataCourse)
  console.log('currentx', currentCard.example)


  let poolLearned = []
  let poolNew = []

  return (
    <Container className="mt-4 mb-4">
     <h1 className="table-title mt-3 mb-3">FlashCard</h1>
      <Row md="12">
          <Col md='12'>
            <Card className="welcome-card mt-2">
                <h4>Bạn đang học khóa học: {course ? course[0].title : 'Khoa hoc'}</h4>
            </Card>
          </Col>
          <Col md='9'>
            {/* Flashcard */}
            <Progress className="cards__process" color="success" value={percentNum}>{cardNum} / {dataCourse && dataCourse.length}</Progress>
            {dataCourse && cardNum < dataCourse.length ? 
            <div className="col-md-12 cardContainer">
              <div className={isFlip ? 'cards' : 'cards flipped'} onClick={() => handleChangeClass()}>
                <div className="front">
                  <div className="cards__words">
                    <h3 className="cards__words">{currentCard && currentCard.wordTitle}</h3>
                  </div>
                </div>
                <div className="back">
                  <div className="cardsImg">
                    <img src="https://www.pdiam.com/wp-content/uploads/2018/08/khai-niem-la-gi-2.jpg" width="150px" heigh="150px"></img>
                  </div>
                  <div className="content">
                    <h3 className="cards__meaning">{currentCard && currentCard.meaning}</h3>
                    <h4 className="cards__example">
                      {currentCard && currentCard.example}
                    </h4>
                  </div>
                </div>
              </div>
            </div> :
            <h3>Bạn đã học xong khóa học</h3>}
          </Col>
          <Col md="3">
            <div className="button__group">
              <Button color="success" className="mt-2 mb-2"> <Shuffle /> Xáo trộn lại khóa học</Button>
              <Button color="warning" className="mt-2 mb-2"> <Restart /> Học lại từ đầu</Button>
            </div>
          </Col>

          <Col md="9" xs="12">
            <div className="cards__button-wapper">
              {cardNum == 0 ? <Button disabled onClick={() => handlePrevCard()} color='primary' className='ml-2 mt2 disable'>Quay lại</Button> :
              <Button onClick={() => handlePrevCard()} color='primary' className='ml-2 mt2 disable'>Quay lại</Button>}
              {dataCourse && cardNum == dataCourse.length ?
              <Button disabled  onClick={() => handleNextCard()} color='success' className='ml-2 mt2'>Từ tiếp theo</Button> :
              <Button  onClick={() => handleNextCard()} color='success' className='ml-2 mt2'>Từ tiếp theo</Button>
              }
            </div>
          </Col>


      </Row>
      <Row md="12">
      </Row>
      
    </Container>
  );
}


const mapStateToProps = (state) =>{
  return{
    course: state.firestore.ordered.course,
    profile: state.firebase.profile,
    dataCourse: state.firestore.ordered.dataCourse,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
      addLearned: (course, dataCourse, profileX, datenow) => {
        dispatch(addLearned(course, dataCourse, profileX, datenow))
      }
  })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
  (props) => {
    console.log("props", props.auth.uid)
    return [
      {
        collection: 'courses',
        where: ['courseId', '==', `${props.match.params.course}`],
        storeAs: 'course'
      },
      {
        collection: `${props.match.params.course}`,
        where: [['image', '!=', '']],
        storeAs: 'dataCourse'
      },
      {
        collection: `${props.match.params.course}`,
        where: [[`learned.${props.auth.uid}`, '!=', "11"]],
        storeAs: 'objDataCourseRemind'
      }
    ]}
))(FlashCardArray);
