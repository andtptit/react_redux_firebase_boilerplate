import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { Container, Input,Row, Col, Button} from 'reactstrap'
import { compose } from 'redux'
import {connect} from 'react-redux';
import FlashStoreTable from '../../../Components/Table/FlashStoreTable';
import { NavLink } from 'react-router-dom'



const FlashStores = ({courses, branches}) => {
    const [selectedBranch, setSelectedBranch] = useState('All');

    const handleBranch = (e) => {
        setSelectedBranch(e.target.value)
    }

    const handleEditFlashStore = () =>{ 

    }



    return(
        <Container className="mt-4 mb-4">
            <h1 className="table-title">FlashStores</h1>
            <Row>
                <Col md='2'>
                    <h3 className="branch">Branch: <span>{selectedBranch}</span></h3>
                    <NavLink to='/flashstores/edit'>
                        <Button type='submit' color="primary">Edit FlashStore</Button>
                    </NavLink>
                </Col>
                <Row md='12'>
                    <Col md='5'>
                        <p>Select Branch</p>
                    </Col>
                    <Col md="auto">
                        <Input type="select" className="selector" name="select" id="branch" onChange={handleBranch}>
                            <option value='All' defaultValue>All FlashStores</option>
                            {branches && branches.map(branch => (
                            <option key={branch.id} value={branch.name}>{branch.name}</option>
                            ))}           
                        </Input>
                    </Col>
                </Row>
            </Row>
            <FlashStoreTable courses={courses}></FlashStoreTable>
        </Container>        
    )
}



const mapStateToProps = (state) => {
    return{
        courses: state.firestore.ordered.courses,
        branches: state.firestore.ordered.branches,
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'branches',
    },
    {
        collection: 'courses',
        storeAs: 'courses'
    },   
]))(FlashStores);


