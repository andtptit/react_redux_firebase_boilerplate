import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CourseCardStudent from '../../../Components/Cards/CourseCardStudent'

const Courses = ({course, courseNew, courseLearned, profile}) => {

 const student = profile.userType === "Student" ? true : false

 const [stCourseLearned, setStCourseLearned] = useState()
 const [stCourseNew, setStCourseNew] = useState()

 useEffect(() => {
    setStCourseLearned(courseLearned)
  }, [courseLearned])

  useEffect(() => {
    
    setStCourseNew(courseNew)

    const arrayNew = courseNew && courseNew.filter(
      (course) => !course.learned.includes(profile.SRN)
    );

    setStCourseNew(arrayNew)

  }, [courseNew])

  
 return(
    <div className={`container my-10`}>
        {student ? <CourseCardStudent profile={profile} courseNew={stCourseNew} courseLearned={stCourseLearned}></CourseCardStudent>: ""}
    </div>
 )
}

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile,
        course: state.firestore.ordered.courses,
        courseLearned: state.firestore.ordered.courseLearned,
        courseNew: state.firestore.ordered.courseNew
    }   
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
      return [
        { collection: 'courses', where: [['learned', 'array-contains', props.profile.SRN]], storeAs: 'courseLearned' },
        // hoặc
        { collection: 'courses', where: [['learned', 'not-in', [props.profile.SRN]]], storeAs: 'courseNew' }
      ]
    })
  )(Courses);