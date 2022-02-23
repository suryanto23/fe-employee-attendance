import React from 'react'
import {Table} from 'react-bootstrap';
import TableEmployeeRow from './TableEmployeeRow'

function TableEmployee(props) {
    return (
        <Table hover size="sm">
            <thead>
                <tr>                
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Place of Birth</th>
                    <th>Join Date</th>
                    <th>Employee Code</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => {return(
                    <TableEmployeeRow
                        key={item.id}
                        id={item.id}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        dateOfBirth={item.dateOfBirth}
                        placeOfBirth={item.placeOfBirth}
                        joinDate={item.joinDate}
                        code={item.code}
                        setEmployeeData={props.setEmployeeData}
                        editHandleShow={props.editHandleShow}
                        deleteRowData={props.deleteRowData}
                    />
                                          
                )})}
            </tbody>
        </Table>
    )
}

export default TableEmployee
