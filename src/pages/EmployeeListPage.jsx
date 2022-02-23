import React , {useState, useEffect} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

import ModalAddEmployee from '../components/ModalAddEmployee';
import TableEmployee from '../components/TableEmployee';
import ModalEditEmployee from '../components/ModalEditEmployee';
import SearchBar from '../components/SearchBar';
import SortBar from '../components/SortBar';
import EmployeeListEmpty from '../components/EmployeeListEmpty';
import ConnectionFailText from '../components/ConnectionFailText';

function EmployeeListPage() {

    // Modal Event
    const [createShow, setCreateShow] = useState(false);
    const createHandleShow = () => {
        clearFill()
        setCreateShow(true)
    };
    const createHandleClose = () => {
        clearFill()
        setCreateShow(false)
    };
    const [editShow, setEditShow] = useState(false);
    const editHandleShow = (targetId) => {
        setEditShow(true)
        setDataId(targetId)
    };
    const editHandleClose = () => {
        setEditShow(false)
    };

    const [data, setData] = useState([])
    const [dataId , setDataId] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [connectionFail, setConnectionFail] = useState(false);
    const [display, setDisplay] = useState([])
    const [sort, setSort] = useState([])
    
    const [employeeData, setEmployeeData] = useState({
        FirstName : "",
        LastName : "",
        DateOfBirth : new Date(),
        PlaceOfBirth : "",
        JoinDate : new Date()
    });

    const handleFill = (col , e) => {
        if(col === "DateOfBirth" || col === "JoinDate"  ){
            setEmployeeData({ ...employeeData, [col] : moment(e.target.value , "YYYY-MM-DD").toDate()})
        } else{
            setEmployeeData({ ...employeeData, [col] : e.target.value})            
        }
    }

    const clearFill = () => {
        setEmployeeData({
            FirstName : "",
            LastName : "",
            DateOfBirth : "",
            PlaceOfBirth : "",
            JoinDate : ""
        })
    }

    const getData = () => {
        setIsLoad(true)
        axios.get(process.env.REACT_APP_API_URL_EMPLOYEE)
        .then(res => {
            setConnectionFail(false)
            setData(res.data)
            setDisplay(res.data)
            setIsLoad(false)
        })
        .catch(err => {
            if(!err.status){
                setIsLoad(false)
                setConnectionFail(true)
            }
        })
    }

    const postData = (e) => {
        e.preventDefault()
        const content = {
            ...employeeData, 
            DateOfBirth : moment(employeeData.DateOfBirth).format("DD-MM-YYYY"),
            JoinDate : moment(employeeData.JoinDate).format("DD-MM-YYYY")
        }
        axios.post(process.env.REACT_APP_API_URL_EMPLOYEE , content )
        .then(res => {
            createHandleClose()
            getData()
        });
    }

    const editRowData = (e) => {
        e.preventDefault()
        const newData = {...employeeData, 
            Id : dataId,
            DateOfBirth : moment(employeeData.DateOfBirth).format("DD-MM-YYYY"),
            JoinDate : moment(employeeData.JoinDate).format("DD-MM-YYYY")
        }
        axios.put(process.env.REACT_APP_API_URL_EMPLOYEE , newData)
        .then(res => {
            editHandleClose()
            getData()
        })
    }

    const deleteRowData = (targetId) => {
        axios.delete(process.env.REACT_APP_API_URL_EMPLOYEE , {data : {id : targetId}} )
        .then(res => getData())
    }

    const handleSearch = (target) => {
        let searchResult = data.filter(item => 
            item.firstName.toLowerCase().includes(target.toLowerCase()) || 
            item.lastName.toLowerCase().includes(target.toLowerCase()) || 
            (item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()).includes(target.toLowerCase()) || 
            (item.lastName.toLowerCase() + " " + item.firstName.toLowerCase()).includes(target.toLowerCase()) || 
            item.code.toString().includes(target)
        )
        if(searchResult){
            setDisplay(searchResult)
        } else{
            setDisplay(data)
        }
    }

    switch (sort) {
        case "First Name":
                display.sort((a,b) => {
                if(a.firstName > b.firstName)return 1            
                return (a.firstName < b.firstName) ? -1 : 0
            })
        break;
        case "Last Name":
            display.sort((a,b) => {
            if(a.lastName > b.lastName)return 1            
                return (a.lastName < b.lastName) ? -1 : 0
            })
        break;
        case "Employee Code":
            display.sort((a,b) => {
                if(a.code > b.code)return 1            
                return (a.code < b.code) ? -1 : 0
            })
        break;
        default:
            if(display) display.sort((a, b) => {return a.code - b.code});
            break;
    }

    useEffect(() => {
        getData()
    }, [setData])

    return (
        <Container fluid className='cst-content-container pt-4 pb-5'>
              <ModalAddEmployee  
                    title={'Create New User'}
                    submitText={'Create'}
                    show={createShow}
                    close={createHandleClose}
                    employeeData={employeeData}
                    handleFill={handleFill}
                    submitData={postData}
                /> 
                <ModalEditEmployee                    
                    show={editShow}
                    close={editHandleClose}
                    employeeData={employeeData}
                    handleFill={handleFill}
                    submitData={editRowData}
                />
            <div className='d-flex align-items-center'>
                <h2 className='my-4 fw-light'>Employee List</h2>
                <Button className='h-25 mx-2 cst-button-pop mt-2' onClick={() => createHandleShow()}>
                    + Add
                </Button>
            </div>
            {data.length > 0 &&
                <>
                    <Row className='mb-5'>
                        <Col xs={5}>
                            <SearchBar
                                placeholder={"Type to search employee with first name, last name, or code"}
                                search={handleSearch}
                            />
                        </Col>
                        <Col>
                            <SortBar setSort={setSort} />
                        </Col>
                    </Row>
                    <TableEmployee
                        data={display}
                        setEmployeeData={setEmployeeData}
                        editHandleShow={editHandleShow}
                        editRowData={editRowData}
                        deleteRowData={deleteRowData}
                    />                
                </>
            }
            {!isLoad && data.length < 1 && !connectionFail && <EmployeeListEmpty/>}
            {!isLoad && connectionFail && <ConnectionFailText/>}
        </Container>
    )
}

export default EmployeeListPage
