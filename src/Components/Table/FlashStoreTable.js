import React, { useEffect, useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Button, Form, Input, Table} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import {setStudentSuspended} from '../../Store/actions/studentActions'


const FlashStoreTable = ({students, sortedByBranch, branch, setStudentSuspended, courses}) => {
    const branchWise = branch === 'All' ? students : sortedByBranch; 
    let studentData = branchWise;

    console.log(courses);

    const handleSuspend = (student) => {
        setStudentSuspended(student)
    }

    return(
        <React.Fragment>
            <Table responsive bordered className="mt-4 mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course ID</th>
                        <th>Số thành viên đã học</th>
                        <th>Tổng số từ vựng</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                {courses && courses.map((course)=> (
                    <tr key={course.SRN}>
                        <td>
                            <NavLink to={`/flashstores/${course.courseId}`}>
                                {course.title}
                            </NavLink></td>
                        <td>{course.courseId}</td>
                        <td>15</td>
                        <td>100</td>
                        <td>
                            <Button outline color='danger' className="suspend-button" onClick={() => handleSuspend(course)}>{course.suspended ? 'Viewd':'View'}</Button>
                        </td>
                    </tr>   
                ))}
                </tbody>
            </Table>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    console.log(state)
    return{
        courses: state.firestore.ordered.users || [],
        sortedByBranch: state.firestore.ordered.sortedByBranch || [],
        courses: state.firestore.ordered.courses || [],
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        setStudentSuspended: (student) => {
            dispatch(setStudentSuspended(student))
        }
    })
}





export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) => 
    [ 
    {
        collection: 'courses',
        where: [['courseId', '!=', '']],
    },
]))(FlashStoreTable);