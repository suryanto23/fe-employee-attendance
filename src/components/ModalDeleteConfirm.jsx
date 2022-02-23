import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap'

function ModalDeleteConfirm(props) {
    const validString = props.firstName +"-"+ props.lastName
    const deleteValidation = (e) => {
        e.preventDefault()
        props.submitData(props.id)
    }
    return (
        <Modal
            show={props.show}
            onHide={props.close}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This action will permanently remove this employee data including their attendance history from database.</p>
                <p className='mt-5'>Please type <span className='fw-bold'>{validString}</span> to confirm.</p>
                <Form onSubmit={(e) => deleteValidation(e)}>
                    <Form.Group className="mb-3">
                        <Form.Control className='cst-input-secondary' required type="text" placeholder="" value={props.str} onChange={(e) => props.setStr(e.target.value)} />
                    </Form.Group>
                    <Button disabled={props.str !== validString} className='cst-button-secondary-full py-1 mx-1'  type="submit">
                        Confirm Delete
                    </Button>
                    <div className='d-flex justify-content-end'>        
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalDeleteConfirm;
