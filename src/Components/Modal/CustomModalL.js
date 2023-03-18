import React from 'react'
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap'

const CustomModalL = ({modal, toggle, title, close, children}) => {
    return(
        <Modal style={{maxWidth: '900px', width: '100%'}} isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody> 
                {children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
}

export default CustomModalL;