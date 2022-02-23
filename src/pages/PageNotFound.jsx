import React from 'react'
import {Container} from 'react-bootstrap';

function PageNotFound() {
    return (
        <Container fluid className='d-flex flex-column justify-content-center align-items-center h-100'>
            <div className='text-center'>
                <h1 className='display-3 fw-bold'>4<span className='cst-highlight'>O</span>4</h1>
                <h5 className='fw-normal'>Page Not Found</h5>
            </div>
        </Container>
    )
}

export default PageNotFound
