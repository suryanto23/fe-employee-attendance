import React from 'react'
import {Table} from 'react-bootstrap';
import TableAttendanceReportRow from './TableAttendanceReportRow';

function TableAttendanceReport (props) {
    return (
        <Table hover>
            <thead>
                <tr>                                   
                    <th>Attend Date</th>
                    <th>Employee Name</th>
                    <th>Employee Code</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => {return(
                    <TableAttendanceReportRow
                        key={item.id}
                        attendanceDate={item.attendanceDate}
                        firstName={item.employee.firstName}
                        lastName={item.employee.lastName}
                        code={item.employee.code}
                        clockIn={item.clockIn}
                        clockOut={item.clockOut}
                    />
                                          
                )})}
            </tbody>
        </Table>
    )
}

export default TableAttendanceReport
