import React, { useEffect, useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Button, Form, Input, Table} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import {setStudentSuspended} from '../../Store/actions/studentActions'







const FlashStoreTable = ({students, sortedByBranch, branch, setStudentSuspended}) => {
    const branchWise = branch === 'All' ? students : sortedByBranch; 
    let studentData = branchWise;

    console.log(students);

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
            </tr>
        </thead>
        <tbody>
        {studentData && studentData.map((student)=> (
            <tr key={student.SRN}>
            <td>
                <NavLink to={`/flashstores/${student.name}`}>
                    {student.name}
                </NavLink></td>
            <td>{student.Branch}</td>
            <td>
            <Button outline color='danger' className="suspend-button" onClick={() => handleSuspend(student)}>{student.suspended ? 'Unsuspend':'Suspend'}</Button>
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
        students: state.firestore.ordered.users || [],
        sortedByBranch: state.firestore.ordered.sortedByBranch || [],
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
      where: [['coursesId', '==', '2020w1']],
    },
]))(FlashStoreTable);