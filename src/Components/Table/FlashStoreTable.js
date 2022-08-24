import React, { useEffect, useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Button, Form, Input, Table} from 'reactstrap'


const FlashStoreTable = ({students, branch, courses}) => {
    console.log(courses);

    return(
        <React.Fragment>
            <Table responsive bordered className="mt-4 mb-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course ID</th>
                        <th>Tổng số từ vựng</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                {courses && courses.map((course)=> (
                    <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.courseId}</td>
                        <td>{course.courseLength}</td>
                        <td>
                            <Button outline color='primary' className="suspend-button">View</Button>
                        </td>
                    </tr>   
                ))}
                </tbody>
            </Table>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    return{
        sortedByBranch: state.firestore.ordered.sortedByBranch,
        courses: state.firestore.ordered.courses,
        dataCourse: state.firestore.ordered.dataCourse,
    }   
}


export default compose(firestoreConnect((props) => {
    console.log('props', props.courses)
    return ([
        {
        collection: props.courses == [] ? `${props.courses[0].courseId}` : 'khoahoc',
        where: [['image', '!=', '']],
        storeAs: props.courses
    }
    ])

}), connect(mapStateToProps),
)(FlashStoreTable);