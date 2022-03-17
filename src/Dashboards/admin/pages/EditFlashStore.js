import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import EditContainer from '../../../Components/Containers/EditContainer'


const EditFlashStore = () => {
    
    const {flashstore} = useParams();
 
 
    return(
        <Container className="mb-5">
            <h2 className="table-title mt-3 mb-3 p-3">EditFlashStore Details</h2>
            <EditContainer />
        </Container>
    )
}


export default EditFlashStore;