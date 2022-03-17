import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { Container, Input,Row, Col, Button} from 'reactstrap'
import { compose } from 'redux'
import {connect} from 'react-redux';
import FlashStoreTable from '../../../Components/Table/FlashStoreTable';
import { Redirect, Route, Switch } from 'react-router';



const FlashStores = ({branches}) => {
    const [selectedBranch, setSelectedBranch] = useState('All');

    const handleBranch = (e) => {
        setSelectedBranch(e.target.value)
    }

    const handleEditFlashStore = () =>{ 
        let path = `/FlashStores/edit`; 
    }



    return(
        <Container className="mt-4 mb-4">
            <h1 className="table-title">FlashStores</h1>
            <Row>
                <Col md='2'>
                    <h3 className="branch">Branch: <span>{selectedBranch}</span></h3>
                    <Button onClick={handleEditFlashStore} color="primary">Edit FlashStore</Button>
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
            <FlashStoreTable branch={selectedBranch}></FlashStoreTable>
        </Container>        
    )
}



const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'branches'
    },   
]))(FlashStores);


