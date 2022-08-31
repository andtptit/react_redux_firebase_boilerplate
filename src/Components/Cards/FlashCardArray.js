import React, { useEffect, useMemo, useState } from "react";
import "./FlashCardArray.css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Row, Col, Button, Progress, Container } from 'reactstrap'
import { addLearned, addLearned_Title } from '../../Store/actions/courseActions'
import {NextFilled, PreviousFilled} from '@carbon/icons-react'
import CustomBreadcurmb from "../Breadcrumb";


const FlashCardArray = ({course, profile, dataCourse, addLearned, addLearned_Title}) => {

  const profileX = profile.SRN
  let datenow = Date.now()

  const [currentCard, setCurrentCard] = useState({})
  const [cardNum, setCardNum] = useState(1)
  const [isFlip, setIsFlip] = useState(true)
  const [percent, setPercent] = useState(0)
  const [percentNum, setPercentNum] = useState(0)
  const [isShuffer, setIsShuffer] = useState(false)
  const [meaning, setMeaning] = useState('')


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
    for (let i = dataCourse && dataCourse.length - 1; i >= 0; i--) {
      arr_indexx.push(i)
    }
    arr_indexx = arr_indexx.sort(() => Math.random() - 0.5)
    return arr_indexx
  }, [dataCourse != undefined, isShuffer])

  useEffect(() => {
    if (dataCourse && cardNum <= dataCourse.length){
      dataCourse && setCurrentCard(dataCourse[arr_index[cardNum - 1]])

      setMeaning(dataCourse[arr_index[cardNum - 1]].meaning)

    }
  },[dataCourse != undefined, cardNum, isShuffer])


  console.log("meaning", meaning)
  
  let arr_meaning = ''
  useEffect(() => {
    arr_meaning = meaning.split(":")
  },)

  console.log('arr_meaning', arr_meaning)

  const handleRestartCourse = () => {
    setCardNum(1)
  }

  const handleShufferCourse = () => {
    setCardNum(1)
    setIsShuffer(!isShuffer)
  }

  let iconStyles = { color: "#3c3c3c" }

  const str_href = window.location.pathname
  const url_bred = str_href.split("/")  

  return (
    <Container className="mt-4 mb-4 card-container__custom">
     <h1 className="table-title mt-3 mb-3">Học FlashCard</h1>
     <CustomBreadcurmb url_bred={url_bred} />
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
                  <div className="cards__words__group">
                    <h3 className="cards__words">{currentCard && currentCard.wordTitle}</h3>
                    <h5 className="cards__subtitle">{currentCard && currentCard.subTitle}</h5>
                  </div>
                </div>
                <div className="back">
                  <div className="cardsImg__group">
                    {
                      currentCard.image ? <img className="cardsImg" src={currentCard && currentCard.image} width="150px" heigh="150px"></img> : ""
                    }
                  </div>
                  <div className="content">
                    <div className="cards__meaning__group">
                      <h6 className="cards__subtitle"></h6>
                      {meaning && meaning.split(":").length > 1 ? 
                      <>
                        <h3 className="cards__meaning__kr">{meaning.split(":")[0]}</h3>
                        <h3 className="cards__meaning__vn">{meaning.split(":")[1]}</h3>
                        </> : <h3 className="cards__meaning__vn">{meaning.split(":")[0]}</h3>}
                      
                    </div>
                    <div className="cards_example__group">
                      <h6 className="cards__subtitle">Ví dụ:</h6>
                      {

                      currentCard.example ? currentCard.example.split("|").map(function(item, index){
                        if(item.split(":").length > 1) {
                          return <div className="cards__example__split">
                                  <h4 className="cards__example__kr" key={index}>{item.split(":")[0]}</h4>
                                  <h4 className="cards__example__vn" key={index}>{item.split(":")[1]}</h4>
                                </div>
                        }else
                        {return <h4 className="cards__example__kr" key={index}>{item}</h4>}
                      }) : ""
                      }
                        
                    </div>
                  </div>
                </div>

              </div>
              <div className="cards__button-wapper__cards">
                {cardNum == 1 ? <Button disabled onClick={() => handlePrevCard()} className="cards__button-wapper__prev">
                    <PreviousFilled style={iconStyles} className="left" size={30}/>
                  </Button> : 
                  <Button onClick={() => handlePrevCard()} className="cards__button-wapper__prev">
                    <PreviousFilled style={iconStyles} className="left" size={30}/>
                  </Button>}
                
                {
                  dataCourse && cardNum > dataCourse.length ? <Button disabled onClick={() => handleNextCard()} className="cards__button-wapper__next">
                    <NextFilled style={iconStyles} className="right" size={30}/>
                  </Button> :
                  <Button onClick={() => handleNextCard()} className="cards__button-wapper__next">
                      <NextFilled style={iconStyles} className="right" size={30}/>
                  </Button>
                }
                
              </div>
              <div className="xxxm"></div>
            </div> :
            <div className="cards_finish__group">
              <div className="cards_finish__group__title">
                Bạn vừa hoàn thành phần
              </div>
              <div className="cards_finish__group__name_course">{course && course[0].title}</div>
                <Button href="/courses" outline color="success" >
                  
                  Quay lại khóa học
                </Button>
            </div>
            }
          </Col>
          <Col md="3">
            <div className="cards__button-wapper">
                <Button onClick={() => handleShufferCourse()} color="danger" className="button__group__button ml-2 mt2">
                  Trộn
                  </Button>
                <Button onClick={() => handleRestartCourse()} color="info" className="button__group__button ml-2 mt2">
                  Học lại
                </Button>
            </div>
          </Col>

      </Row>
      <Row md="12">
        <Col md='12'>
          <div className="header__custom">
              <h4>Từ vựng đã học</h4>
          </div>
          {objDataCourseRemind.length ? objDataCourseRemind.map(function(item, index){
                  return <div key={index} className="words_statistic__group"> 
                            <h4 className="words_statistic__title">{item.wordTitle}</h4>
                            <h4 className="words_statistic__meaning">{item.meaning}</h4>
                            {/* <h4 className="words_statistic__speaker" key={index}>{item.voice}</h4> */}
                        </div>
                }) : <h4 className="words_statistic__title" >Bắt đầu học ngay</h4>}
          <div className="header__custom">
              <h4>Từ vựng chưa học</h4>
          </div>
          {objDataCourseNew.length ? objDataCourseNew.map(function(item, index){
                  return <div key={index} className="words_statistic__group"> 
                            <h4 className="words_statistic__title" >{item.wordTitle}</h4>
                            <h4 className="words_statistic__meaning" >{item.meaning}</h4>
                            {/* <h4 className="words_statistic__speaker" key={index}>{item.voice}</h4> */}
                        </div>
                }) : <h4 className="words_statistic__title" >Bạn đã học hết tất cả các từ vựng</h4>}
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
        where: [['wordId', '!=', '']],
        storeAs: 'dataCourse'
      },
      {
        collection: `${props.match.params.course}`,
        where: [[`learned.${props.auth.uid}`, '!=', "11"]],
        storeAs: 'objDataCourseRemind'
      }
    ]}
))(FlashCardArray);
