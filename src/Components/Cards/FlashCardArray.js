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
  return (
    <Container className="mt-4 mb-4">
     <h1 className="table-title mt-3 mb-3">FlashCard</h1>
      <Row md="12">
          <Col md='6'>
            <Card className="welcome-card mt-2">
                <h4>{course ? course[0].title : 'Khoa hoc'}</h4>
            </Card>
          </Col>
          <Col md='6'>
            <h5>Bạn đã học {objDataCourseRemind ? objDataCourseRemind.length : 0}/{dataCourse ? dataCourse.length : 0} từ vựng</h5>
            <Progress className='mt-2' value={percent.toFixed(2)} />
            <div className="text-center">Tiến độ {percent.toFixed(2)}%</div>
          </Col>
          <Col md='12'>
            <Card className="mt-2 ">
              <FlashcardArray
                cards={arr}
                count={true}
                forwardRef={arrayRef}
                control={false}
                FlashCardClassName="FlashcardWrapper__item--back"
                setCurrentCard={(currentCard) => {
                  setCurrentCard(currentCard)
                }}
                onCardChange={(cardNumber)=>{
                  setCardNum(cardNumber)
                }}
              />
            </Card>
            <Button color="primary" type="submit" className="mt-4 mr-4" onClick={() => handlePrevCard()}>Prev</Button>
            <Button color="primary" type="submit" className="mt-4" onClick={() => handleNextCard()}>Next</Button>
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
