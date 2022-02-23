import React from 'react'

function AttendanceReportEmpty() {
    return (
        <div className='text-center my-5 py-5'>
            <h3 className='fw-bold'>Empty<span className='cst-highlight'> Attendance</span></h3>
            <p className='fw-light d-none d-md-block'>You may mark your attendance clock in attendance manager</p>
        </div>
    )
}

export default AttendanceReportEmpty
