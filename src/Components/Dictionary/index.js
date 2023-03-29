
import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Progress, Container } from 'reactstrap'
import useStyle from './style';

const MAX_LEN_NAME = 20;

function LeaderBoardItem({ classes, nthTop, avt, name, score, unit, wordTitle, meaning, subTitle }) {

    const color = 'rgba(0, 0, 0, 0.15)'

    
  return (
    <div
      className={classes.box}
      style={{ borderColor: color }}>

      <div className={classes.content}>
        <h5 className={classes.name}>{wordTitle}</h5>
      </div>

        <div className={classes.meaning}>{meaning}</div>

    </div>
  );
}

function Dictionary({ objDataCourseRemind, objDataCourseNew }) {

    const color = '#EC4B76';

    const classes = useStyle({color});

  return (
    <>
    <div className={classes.root}>
        <div className={`${classes.titleWrap} flex-center-between`}>
            <h3 className={classes.title}>Từ vựng đã học</h3>
        </div>
        <div className={classes.boxWrap}>
          {objDataCourseRemind.length ? objDataCourseRemind.map(function(item, index){
                  return <LeaderBoardItem 
                            {...item} 
                            classes={classes}
                            key={index}
                            nthTop={index + 1}
                        />
                }) : <h4 key={"title_start"} className="words_statistic__title" >Bắt đầu học ngay</h4>}
        </div>
    </div>

    <div style={{marginTop: '30px'}} className={classes.root}>
        <div className={`${classes.titleWrap} flex-center-between`}>
            <h3 className={classes.title}>Từ vựng chưa học</h3>
        </div>
        <div className={classes.boxWrap}>
          {objDataCourseNew.length ? objDataCourseNew.map(function(item, index){
                  return <LeaderBoardItem 
                              {...item} 
                              classes={classes}
                              key={index}
                              nthTop={index + 1}
                          />
                }) : <h4 key={"title_end"} className="words_statistic__title" >Bạn đã học hết tất cả các từ vựng</h4>}
        </div>
    </div>
    </>
    
  );
}

export default Dictionary;
