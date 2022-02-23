import React , {useState} from 'react'
import moment from 'moment';
import { Button } from "react-bootstrap";
import ModalDeleteConfirm from './ModalDeleteConfirm';

function TableEmployeeRow(props) {

    const [str, setStr] = useState("")
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () =>  {
        setStr("")
        setShow(false)
    };

    const setCurrentData = () => {
        props.setEmployeeData({
            FirstName : props.firstName,
            LastName : props.lastName,
            DateOfBirth : moment(props.dateOfBirth , "DD-MM-YYYY").toDate(),
            PlaceOfBirth : props.placeOfBirth,
            JoinDate : moment(props.joinDate , "DD-MM-YYYY").toDate()
        })
        props.editHandleShow(props.id)
    }


    return (
        <tr>
            <td className='cst-capitalize'>{props.firstName}</td>
            <td className='cst-capitalize'>{props.lastName}</td>
            <td>{props.dateOfBirth}</td>
            <td className='cst-capitalize'>{props.placeOfBirth}</td>                        
            <td>{props.joinDate}</td>
            <td>{props.code}</td>
            <td>
                <Button className='cst-button-primary mx-2' onClick={() => setCurrentData()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil text-white" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </Button>
                <Button className='cst-button-secondary mx-2' onClick={() => handleShow()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fullrule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </Button>    
            </td> 
            <ModalDeleteConfirm
                show={show}
                close={handleClose}
                id={props.id}
                firstName={props.firstName}
                lastName={props.lastName}
                str={str}
                setStr={setStr}
                submitData={props.deleteRowData}
            />      
        </tr>         
    )
}

export default TableEmployeeRow
