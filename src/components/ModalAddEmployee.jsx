import React from 'react';
import moment from 'moment';
import {Modal, Form, Button} from 'react-bootstrap'

function ModalAddEmployee(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.close}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title>Add New Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => props.submitData(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className='cst-input' required type="text" placeholder="Enter First Name" value={props.employeeData.FirstName} onChange={(e) => props.handleFill("FirstName" , e)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className='cst-input' required type="text" placeholder="Enter Last Name"  value={props.employeeData.LastName} onChange={(e) => props.handleFill("LastName" , e)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control className='cst-input' required type="date" value={moment(props.employeeData.DateOfBirth).format("YYYY-MM-DD")} onChange={(e) => props.handleFill("DateOfBirth" , e)} />                        
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Place of Birth</Form.Label>
                        <Form.Control className='cst-input' required type="text" placeholder="Enter Place of Birth"  value={props.employeeData.PlaceOfBirth} onChange={(e) => props.handleFill("PlaceOfBirth" , e)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Join Date</Form.Label>
                        <Form.Control className='cst-input' required type="date" value={moment(props.employeeData.JoinDate).format("YYYY-MM-DD")} onChange={(e) => props.handleFill("JoinDate" , e)} />
                    </Form.Group>
                    <div className='d-flex justify-content-end mt-4'>
                        <Button className='cst-button-secondary py-1 mx-1' onClick={props.close}>
                            Cancel
                        </Button>
                        <Button className='cst-button-primary py-1 mx-1' type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalAddEmployee;
