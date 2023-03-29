import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Sliders from '../Sliders';

const useStyles = makeStyles({
    element: {
      paddingTop: '20px',
    },

    leaderboard: {
        fontSize: '2.1rem',
        color: 'var(--text-color)'        
    },

    "@media (max-width: 992px)": {
        element: {
            paddingTop: '5px'
        },

        
    }
  });

const CourseCard = ({profile, courseNew, courseLearned}) => {

    const classes = useStyles();
    return(
        <div className="container my-10">
            <div className={`${classes.element} leaderboard`}>
                <h1 className={`${classes.leaderboard} flex-start`}>
                    Khóa học đã học
                </h1>
            </div>
            <div className="dyno-break"></div>
            <Sliders profile={profile} courseData={courseLearned} />

            <div className={`${classes.element} leaderboard`}>
                <h1 className={`${classes.leaderboard} flex-start`}>
                    Khóa học mới
                </h1>
            </div>
            <div className="dyno-break"></div>
            <Sliders profile={profile} courseData={courseNew} />
        </div>

    )
}


export default CourseCard;
