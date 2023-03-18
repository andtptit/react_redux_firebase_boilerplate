import React  from 'react'
import Sliders from '../Sliders'

const CourseCard = ({courseData, profile}) => {
    return(
            <div className='card-container__custom'>
                <Sliders profile={profile} courseData={courseData} />
            </div>
    )
}

export default CourseCard;
