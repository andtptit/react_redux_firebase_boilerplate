import React, { useEffect, useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import {connect} from 'react-redux'
import { compose } from 'redux'
import {Button, Form, Input, Table} from 'reactstrap'
import { NavLink } from 'react-router-dom'
import {setStudentSuspended} from '../../Store/actions/studentActions'







const StudentTable = ({students, sortedByBranch, branch, setStudentSuspended}) => {
    const branchWise = branch === 'All' ? students : sortedByBranch; 
    let studentData = branchWise;


    const handleSuspend = (student) => {
        setStudentSuspended(student)
    }

    return(
        <React.Fragment>
        <Table responsive bordered className="mt-4 mb-4">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {studentData && studentData.map((student)=> (
            <tr key={student.SRN}>
                <td>
                    <NavLink to={`/students/${student.name}`}>
                        {student.name}
                    </NavLink></td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>
                    <Button outline color='success'  onClick={() => handleSuspend(student)} className="mr-3">Edit</Button>
                    <Button outline color='danger'  onClick={() => handleSuspend(student)}>Remove</Button>
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
      collection: 'users',
      where: [['userType', '==', 'Student']],
    },
    {
        collection: 'users',
        where: [['userType', '==', 'Student'], ['Branch','==',`${props.branch}`]],
        storeAs: 'sortedByBranch'
    },
]))(StudentTable);