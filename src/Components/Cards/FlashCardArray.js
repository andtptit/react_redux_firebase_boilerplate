import React, { useEffect, useRef, useState } from "react";
import Flashcard from "./FlashCard";
import "./FlashCardArray.css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FlashcardArray } from "react-quizlet-flashcard";
import {Card, CardBody, CardImg, Row, Col, CardSubtitle, Container, CardHeader, Button, Progress, CardText} from 'reactstrap'
import { addLearned } from '../../Store/actions/courseActions'




const FlashCardArray = ({course, profile, dataCourse, addLearned}) => {
  const cards = [
    {
      id: 1,
      front: "What is the capital of <u>Alaska</u>?",
      back: "Juneau",
      frontChild: <div>Hello there</div>,
      backChild: <p>This is a back child</p>
    },
    {
      id: 2,
      front: "What is the capital of California?",
      back: "Sacramento",
    },
    {
      id: 3,
      front: "What is the capital of New York?",
      back: "Albany",
    },
    {
      id: 4,
      front: "What is the capital of Florida?",
      back: "Tallahassee",
    },
    {
      id: 5,
      front: "What is the capital of Texas?",
      back: "Austin",
    },
    {
      id: 6,
      front: "What is the capital of New Mexico?",
      back: "Santa Fe",
    },
    {
      id: 7,
      front: "What is the capital of Arizona?",
      back: "Phoenix",
    },
  ];

  const arr = []
  const profileX = profile.SRN
  let datenow = Date.now()

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

  console.log('objDataCourseRemind', objDataCourseRemind, 'objDataCourseNew', objDataCourseNew);


  dataCourse && dataCourse.map((item, index) => {
    arr.push({
      id: item.wordId,
      front: item.wordTitle,
      back: item.meaning,
      index: index
    })
  })

  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if(objDataCourseRemind, dataCourse) {
      setPercent(objDataCourseRemind.length / dataCourse.length * 100)
    }
  },[objDataCourseRemind]);

  const [currentCard, setCurrentCard] = useState({})
  const [cardNum, setCardNum] = useState(0)
  const [isFlip, setIsFlip] = useState(true)

  const handlePrevCard = () => {
    arrayRef.current.prevCard()
  }

  const handleNextCard = () => {
    arrayRef.current.nextCard()
    addLearned(course, dataCourse[currentCard.index], profileX, datenow)

    if (cardNum == dataCourse.length) {
      console.log("Chuc mung ban da hoan thanh khoa hoc")
    }
  }
  const arrayRef = useRef({});

  const handleChangeClass = () => {
    setIsFlip(!isFlip)
  }

  return (
    <Container className="mt-4 mb-4">
     <h1 className="table-title mt-3 mb-3">FlashCard</h1>
      <Row md="12">
          <Col md='12'>
            <Card className="welcome-card mt-2">
                <h4>{course ? course[0].title : 'Khoa hoc'}</h4>
            </Card>
          </Col>
          <Col md='1'>
            <h5>{objDataCourseRemind ? objDataCourseRemind.length : 0}/{dataCourse ? dataCourse.length : 0}</h5>
          </Col>
          <Col md='11'>
            <Progress className='mt-2' value={percent.toFixed(2)} />
          </Col>

          <Col md='12'>
            {/* Flashcard */}
            <div className="col-md-12 cardContainer">
              <div className={isFlip ? 'cards' : 'cards flipped'} onClick={() => handleChangeClass()}>
                <div className="front">
                  <div class="cards__words">
                    <h3 className="cards__words">개념 [개ː념] </h3>
                  </div>
                </div>
                <div className="back">
                  <div className="cardsImg">
                    <img src="https://www.pdiam.com/wp-content/uploads/2018/08/khai-niem-la-gi-2.jpg" width="150px" heigh="150px"></img>
                  </div>
                  <div class="content">
                    <h3 className="cards__meaning">[槪念] khái niệm</h3>

                      <p>
                        개념이 없다: không có khái niệm 
                      </p>
        
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* <Col md="12">
            <div className="cards__button-wapper">
              <Button color='primary' className='ml-2 mt2'>Quay lại</Button>
              <Button color='success' className='ml-2 mt2'>Từ tiếp theo</Button>
            </div>
          </Col> */}


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
