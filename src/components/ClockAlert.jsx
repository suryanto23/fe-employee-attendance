import React from 'react';
import {Alert} from 'react-bootstrap';

function ClockAlert(props) {
    return (
        <Alert className='position-absolute fixed-top text-center text-capitalize cst-alert'>
            {props.text}
        </Alert>
    )
}

export default ClockAlert
