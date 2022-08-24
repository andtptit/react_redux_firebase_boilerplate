import React, { useEffect, useMemo, useRef, useState } from "react";
import "./FlashCardArray.css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Card, CardBody, CardImg, Row, Col, CardSubtitle, Container, CardHeader, Button, Progress, CardText} from 'reactstrap'
import { addLearned, addLearned_Title } from '../../Store/actions/courseActions'
import { CircularProgressbar } from 'react-circular-progressbar';
import {NextFilled, PreviousFilled, Restart, Shuffle} from '@carbon/icons-react'



const FlashCardArray = ({course, profile, dataCourse, addLearned, addLearned_Title}) => {

  const profileX = profile.SRN
  let datenow = Date.now()

  const [currentCard, setCurrentCard] = useState({})
  const [cardNum, setCardNum] = useState(1)
  const [isFlip, setIsFlip] = useState(true)
  const [percent, setPercent] = useState(0)
  const [percentNum, setPercentNum] = useState(0)
  const [isShuffer, setIsShuffer] = useState(false)


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
  },[cardNum, dataCourse]);


  const handlePrevCard = () => {
    setCardNum(cardNum - 1)
  }

  const handleNextCard = () => {

    setCardNum(cardNum + 1)
    addLearned(course, currentCard, profileX, datenow)

    if (cardNum == 1){
      console.log("Add learned")
      addLearned_Title(course, profileX, datenow)
    }
  }

  const handleChangeClass = () => {
    setIsFlip(!isFlip)
  }

  let arr_indexx = []

  let arr_index = useMemo(() => {
    console.log('Usememo')
    for (let i = dataCourse && dataCourse.length - 1; i >= 0; i--) {
      arr_indexx.push(i)
    }
    arr_indexx = arr_indexx.sort(() => Math.random() - 0.5)
    return arr_indexx
  }, [dataCourse != undefined, isShuffer])

  useEffect(() => {
    console.log('cardNum', cardNum)
    console.log('arr_index', arr_index)
    if (dataCourse && cardNum <= dataCourse.length){
      dataCourse && setCurrentCard(dataCourse[arr_index[cardNum - 1]])
    }
  },[dataCourse != undefined, cardNum, isShuffer])


  console.log("objDataCourseNew", objDataCourseNew)
  console.log("objDataCourseRemind", objDataCourseRemind)


  const handleRestartCourse = () => {
    setCardNum(1)
  }

  const handleShufferCourse = () => {
    setCardNum(1)
    setIsShuffer(!isShuffer)
  }

  let iconStyles = { color: "#3c3c3c", fontSize: "1.5em" };

  return (
    <Container className="mt-4 mb-4 card-container__custom">
     <h1 className="table-title mt-3 mb-3">FlashCard</h1>
      <Row md="12">
          <Col md='12'>
            <div className="header__custom">
              <h4>Bạn đang học khóa học: {course ? course[0].title : 'Khoa hoc'}</h4>
            </div>
          </Col>
          <Col md='9'>
            {dataCourse && cardNum <= dataCourse.length ? 
            <div className="col-md-12 cardContainer">
              <Progress  color="success" value={percentNum}>{cardNum} / {dataCourse && dataCourse.length}</Progress>
              <div className={isFlip ? 'cards' : 'cards flipped'} onClick={() => handleChangeClass()}>
                <div className="front">
                  <div className="cards__words">
                    <h3 className="cards__words">{currentCard && currentCard.wordTitle}</h3>
                  </div>
                  {/* <div className="cards__button-wapper__cards">
                    <Button onClick={() => handlePrevCard()} className="cards__button-wapper__prev">
                      <PreviousFilled style={iconStyles} className="left" size={30}/>
                    </Button>
                    <Button onClick={() => handleNextCard()} className="cards__button-wapper__next">
                      <NextFilled style={iconStyles} className="right" size={30}/>
                    </Button>
                  </div> */}
                </div>
                <div className="back">
                  <div className="cardsImg__group">
                    <img className="cardsImg" src="https://www.pdiam.com/wp-content/uploads/2018/08/khai-niem-la-gi-2.jpg" width="150px" heigh="150px"></img>
                  </div>
                  <div className="content">
                    <div className="cards__meaning__group">
                      <h6 className="cards__subtitle">Nghĩa tiếng việt:</h6>
                      <h3 className="cards__meaning">{currentCard && currentCard.meaning}</h3>
                    </div>
                    <div className="cards_example__group">
                      <h6 className="cards__subtitle">Ví dụ:</h6>
                      {currentCard.example ? currentCard.example.map(function(item, index){
                        return <h4 className="cards__example" key={index}>{item}</h4>;
                      }) : ""}
                    </div>
                  </div>
                  {/* <div className="cards__button-wapper__cards">
                    <Button onClick={() => handlePrevCard()} className="cards__button-wapper__prev">
                      <PreviousFilled style={iconStyles} className="left" size={30}/>
                    </Button>
                    <Button onClick={() => handleNextCard()} className="cards__button-wapper__next">
                      <NextFilled style={iconStyles} className="right" size={30}/>
                    </Button>
                  </div> */}
                </div>

              </div>
              <div className="cards__button-wapper__cards">
                <Button onClick={() => handlePrevCard()} className="cards__button-wapper__prev">
                  <PreviousFilled style={iconStyles} className="left" size={30}/>
                </Button>
                <Button onClick={() => handleNextCard()} className="cards__button-wapper__next">
                  <NextFilled style={iconStyles} className="right" size={30}/>
                </Button>
              </div>
              <div className="xxxm"></div>

                
                {/* {cardNum == 1 ? <Button disabled onClick={() => handlePrevCard()}  className='ml-2 mt2 disable'><PreviousFilled size={30}/></Button> :
                <Button onClick={() => handlePrevCard()}  className='ml-2 mt2 disable'> <PreviousFilled size={30}/></Button>}
                {dataCourse && cardNum > dataCourse.length ?
                <Button disabled  onClick={() => handleNextCard()} color='success' className='ml-2 mt2'><NextFilled size={30}/></Button> :
                <Button  onClick={() => handleNextCard()} color='success' className='ml-2 mt2'><NextFilled size={30}/></Button>
                }
                
                <Button onClick={() => handleShufferCourse()} color="success" className="button__group__button ml-2 mt2"> <Shuffle />Trộn khóa học</Button>
                <Button onClick={() => handleRestartCourse()} color="warning" className="button__group__button ml-2 mt2">
                  <Restart size={28} style={iconStyles} /> Học lại
                </Button> */}
    

              {/* <div className="cards__button-wapper">
                <Button onClick={() => handleShufferCourse()} color="success" className="button__group__button ml-2 mt2"> <Shuffle />Trộn khóa học</Button>
                <Button onClick={() => handleRestartCourse()} color="warning" className="button__group__button ml-2 mt2">
                  <Restart size={28} style={iconStyles} /> Học lại
                </Button>
              </div> */}
            </div> :
            <div>
              Bạn đã hoàn thành khóa học
            </div>
            }
          </Col>
          <Col md="3">
            <div className="cards__button-wapper">
                <Button onClick={() => handleShufferCourse()} color="success" className="button__group__button ml-2 mt2">
                  <Shuffle size={28} style={iconStyles} />Trộn
                  </Button>
                <Button onClick={() => handleRestartCourse()} color="warning" className="button__group__button ml-2 mt2">
                  <Restart size={28} style={iconStyles} /> Học lại
                </Button>
            </div>
          </Col>

      </Row>
      <Row md="12">
        <Col md='12'>
          <div className="header__custom">
              <h4>Từ vựng đã học</h4>
              {objDataCourseNew && objDataCourseNew.map((obj, index) => {
                <h4 key={index}>{obj.meaning}</h4>
              })}
          </div>
          <div className="header__custom">
              <h4>Từ vựng đã học</h4>
              {objDataCourseRemind ? objDataCourseRemind.map(function(item, index){
                  return <h4 className="cards__example" key={index}>{item.meaning}</h4>;
                }) : ""}
          </div>
        </Col>
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
      },
      addLearned_Title: (course, profileX, datenow) => {
        dispatch(addLearned_Title(course, profileX, datenow))
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
