import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import FlashStoreInfo from '../../../Components/Info/FlashStoreInfo'


const FlashStore = () => {
    
    const {flashstore} = useParams();
    console.log(flashstore);
 
 
    return(
        <Container className="mb-5">
            <h2 className="table-title mt-3 mb-3 p-3">FlashStore Details</h2>
            <FlashStoreInfo name={flashstore}></FlashStoreInfo>
        </Container>
    )
}


export default FlashStore;