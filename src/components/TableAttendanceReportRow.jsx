import React from 'react'

function TableAttendanceReportRow(props) {
    return (
        <tr className='position-relative'>    
            <td>
                <div className={
                    props.clockOut 
                    ? 'd-none d-md-block cst-border-attended' 
                    : 'd-none d-md-block cst-border-attending'
                }>
                </div> 
                {props.attendanceDate}
            </td>      
            <td className='cst-capitalize'>{props.firstName +" "+ props.lastName}</td>
            <td>{props.code}</td>    
            <td>{props.clockIn}</td> 
            {/* <td>{props.clockOut}</td> */}
            <td>{props.clockOut ? props.clockOut : <span className='d-block d-md-none cst-clockout-invalid'>o</span>}</td>
        </tr>       
    )
}

export default TableAttendanceReportRow
