import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Sliders from '../Sliders';

const useStyles = makeStyles({
    element: {
      paddingTop: '30px',
    },
  });

const CourseCard = ({profile, courseNew, courseLearned}) => {

    const classes = useStyles();
    return(
        <div className="container my-10">
            <div className={`${classes.element} leaderboard`}>
                <h1 className={`leaderboard-title flex-start`}>
                    Đã học
                </h1>
            </div>
            <div className="dyno-break"></div>
            <Sliders profile={profile} courseData={courseLearned} />

            <div className={`${classes.element} leaderboard`}>
                <h1 className="leaderboard-title flex-start">
                    Chưa học
                </h1>
            </div>
            <div className="dyno-break"></div>
            <Sliders profile={profile} courseData={courseNew} />
        </div>

    )
}


export default CourseCard;
