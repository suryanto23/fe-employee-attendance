import React from 'react'
import {Table} from 'react-bootstrap';
import TableAttendanceRow from './TableAttendanceRow';

function TableAttendance(props) {
    return (
        <Table hover>
            <thead>
                <tr>                
                    <th>Employee Name</th>
                    <th>Employee Code</th>
                    <th>Clocking</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => {return(
                    <TableAttendanceRow
                        key={item.id}
                        id={item.id}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        code={item.code}
                        postData={props.postData}
                    />                                          
                )})}
            </tbody>
        </Table>
    )
}

export default TableAttendance
