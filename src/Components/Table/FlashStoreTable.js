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
                        <th>Số thành viên đã học</th>
                        <th>Tổng số từ vựng</th>
                        <th>Chỉnh sửa</th>
                    </tr>
                </thead>
                <tbody>
                {courses && courses.map((course)=> (
                    <tr key={course.SRN}>
                        <td>{course.title}</td>
                        <td>{course.courseId}</td>
                        <td>15</td>
                        <td>100</td>
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


const mapStateToProps = (state, props) => {
    console.log('state', state)
    return{
        sortedByBranch: state.firestore.ordered.sortedByBranch || [],
        courses: state.firestore.ordered.courses || [],
        dataCourse: state.firestore.ordered.dataCourse || [],
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        
    })
}


export default compose(firestoreConnect((props) => {
    
    console.log('-------',JSON.stringify(props.courses))
    return ([
        {
        collection: props.courses ? `${props.courses[0].courseId}` : 'khoahoc',
        where: [['image', '!=', '']],
        storeAs: props.courses ? 'dataCourse' + `${props.courses[0].courseId}` : 'dataCourse'
    }
    ])

}), connect(mapStateToProps, mapDispatchToProps),
)(FlashStoreTable);