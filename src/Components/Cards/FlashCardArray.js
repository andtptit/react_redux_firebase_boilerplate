import React, { useEffect, useMemo, useState } from "react";
import "./FlashCardArray.css";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Row, Col, Button, Progress, Container } from 'reactstrap'
import { addLearned, addLearned_Title } from '../../Store/actions/courseActions'
import Dictionary from "../Dictionary";


const FlashCardArray = ({course, profile, dataCourse, addLearned, addLearned_Title}) => {

  const profileX = profile.SRN
  let datenow = Date.now()
  let date = new Date()
  const [currentCard, setCurrentCard] = useState({})
  const [cardNum, setCardNum] = useState(1)
  const [isFlip, setIsFlip] = useState(true)
  const [percent, setPercent] = useState(0)
  const [percentNum, setPercentNum] = useState(0)
  const [isShuffer, setIsShuffer] = useState(false)
  const [meaning, setMeaning] = useState('')
  const [weekday, setWeekday] = useState(0)
  // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const background_front = ["front_bg_monday","front_bg_tuesday","front_bg_wednesday","front_bg_thursday","front_bg_friday","front_bg_saturday","front_bg_sunday"];
  const background_back = ["back_bg_monday","back_bg_tuesday","back_bg_wednesday","back_bg_thursday","back_bg_friday","back_bg_saturday","back_bg_sunday"];

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

  date.toLocaleString('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })


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
  
  let arr_meaning = ''
  useEffect(() => {
    arr_meaning = meaning.split(":")
  },)

  const handleRestartCourse = () => {
    setCardNum(1)
  }

  const handleShufferCourse = () => {
    setCardNum(1)
    setIsShuffer(!isShuffer)
    setWeekday(Math.floor(Math.random() * 7));
  }

  let iconStyles = { color: "#3c3c3c" }

  const str_href = window.location.pathname
  const url_bred = str_href.split("/")  

  return (
    <Container className="mt-4 mb-4 card-container__custom">
     {/* <h1 className="table-title mt-3 mb-3">Học FlashCard</h1> */}
     {/* <CustomBreadcurmb url_bred={url_bred} /> */}
      <Row style={{ justifyContent: "center", marginBottom: "35px" }} md="12">
          <Col md='12'>
            <h1 className="course_name--custom">{course ? course[0].title : 'Khoa hoc'}</h1>
            <div className="dyno-break"></div>
          </Col>
          <Col md='9' className="main_flashcard">
            {dataCourse && cardNum <= dataCourse.length ? 
            <div className="col-md-12 cardContainer">
              <Progress className="progress--custom"  color="success" value={percentNum}>{cardNum} / {dataCourse && dataCourse.length}</Progress>
              <div className={isFlip ? 'cards' : 'cards flipped'} onClick={() => handleChangeClass()}>

                <div className={`front ${background_front[weekday]}`}>
                  <div className="center-elements">
                    <div className="logo">
                      <img src="https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/logo_thtt.png?alt=media&token=aee95558-de2a-4527-bc48-d526f5ecc9d2"/>
                    </div>
                  </div>
                  <div className="cards__words__group">
                    <h3 className="text_with_1px_normal cards__words">{currentCard && currentCard.wordTitle}</h3>
                    {/* <h5 className="cards__subtitle">{currentCard && currentCard.subTitle}</h5> */}
                  </div>
                </div>
                <div className={`back ${background_back[weekday]}`}>
                  {/* <div className="cardsImg__group">
                    {
                      currentCard.image ? <img className="cardsImg" src={currentCard && currentCard.image} width="150px" heigh="150px"></img> : ""
                    }
                  </div> */}
                  <div className="content">
                  <div className="center-elements">
                    <div className="logo">
                      <img src="https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/logo_thtt.png?alt=media&token=aee95558-de2a-4527-bc48-d526f5ecc9d2"/>
                    </div>
                  </div>
                    <div className="cards__meaning__group">
                      <h6 className="cards__subtitle">{currentCard && currentCard.subTitle}</h6>
                      {meaning && meaning.split(":").length > 1 ? 
                      <>
                        <h3 className="cards__meaning__kr">{meaning.split(":")[0]}</h3>
                        <h3 className="cards__meaning__vn">{meaning.split(":")[1]}</h3>
                        </> : <h3 className="cards__meaning__vn">{meaning.split(":")[0]}</h3>}
                      
                    </div>
                    <div className="cards_example__group">
                      {/* <h6 className="cards__subtitle">Ví dụ:</h6> */}
                      {

                      currentCard.example ? currentCard.example.split("|").map(function(item, index){
                        if(item.split(":").length > 1) {
                          return <div key={index + "spl"} className="cards__example__split">
                                  <h4 className="cards__example__kr" key={index + "vn"}>{item.split(":")[0]}</h4>
                                  <h4 className="cards__example__vn" key={index + "kr"}>{item.split(":")[1]}</h4>
                                </div>
                        }else
                        {return <h4 className="cards__example__kr" key={index + "kr"}>{item}</h4>}
                      }) : ""
                      }
                        
                    </div>
                  </div>
                </div>

              </div>
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
            <div id="button-cus-group" className="col-md-12">
              <div id="button-cus">
                {cardNum == 1 ?
                  <button disabled onClick={() => handlePrevCard()} className="button-cus" ><span className="material-symbols-outlined">Navigate_Before</span></button> : 
                  <button onClick={() => handlePrevCard()} className="button-cus" ><span className="material-symbols-outlined">Navigate_Before</span></button>}
                {
                  dataCourse && cardNum > dataCourse.length ?
                    <button className="button-cus" disabled onClick={() => handleNextCard()} ><span className="material-symbols-outlined">Navigate_Next</span></button> :
                    <button className="button-cus" onClick={() => handleNextCard()} ><span className="material-symbols-outlined">Navigate_Next</span></button>
                }
                <button className="button-cus button-cus--shuffer" onClick={() => handleShufferCourse()} ><span className="material-symbols-outlined">cached</span></button>
                
                <button className="button-cus button-cus--restart" onClick={() => handleRestartCourse()} ><span className="material-symbols-outlined">Restart_Alt</span></button>
              </div>
            </div>
          </Col>
      </Row>
      
      <Dictionary objDataCourseRemind={objDataCourseRemind} objDataCourseNew={objDataCourseNew} />
      
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
