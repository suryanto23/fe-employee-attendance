import React from 'react'

function EmployeeListEmpty() {
    return (
        <div className='text-center my-5 py-5'>
            <h3 className='fw-bold'>You Don't Have Any <span className='cst-highlight'>Employee</span></h3>
            <p className='fw-light'>Start now by adding a new employee at the button above</p>
        </div>
    )
}

export default EmployeeListEmpty
