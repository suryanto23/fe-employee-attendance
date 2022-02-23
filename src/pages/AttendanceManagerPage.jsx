import React , {useState, useEffect} from 'react'
import axios from 'axios';
import moment from 'moment';
import {Container, Row, Col} from 'react-bootstrap';
import TableAttendance from '../components/TableAttendance';
import DateAndTime from '../components/DateAndTime';
import AttendanceManagerEmpty from '../components/AttendanceManagerEmpty';
import ConnectionFailText from '../components/ConnectionFailText';
import ClockAlert from '../components/ClockAlert';
import SearchBar from '../components/SearchBar';

function AttendanceManagerPage() {

    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [connectionFail, setConnectionFail] = useState(false);
    const [display, setDisplay] = useState([])
    const [employeeName, setEmployeeName] = useState("")
    const [clockInAlert, setClockInAlert] = useState(false)
    const [clockOutAlert, setClockOutAlert] = useState(false)     
    
    const getData = () => {
        setIsLoad(true)
        axios.get(process.env.REACT_APP_API_URL_EMPLOYEE)
        .then(res => {
            setConnectionFail(false)
            setIsLoad(false)
            setData(res.data)
            setDisplay(res.data)
        })
        .catch(err => {
            if(!err.status){
                setIsLoad(false)
                setConnectionFail(true)
            }
        })
    }

    const postData = (data, employeeFullName) => {              
        axios.get(process.env.REACT_APP_API_URL_ATTENDANCE)
        .then(res => {
            const attended = res.data.filter(item => item.employeeId === data.EmployeeId && item.attendanceDate === moment(new Date()).format("DD-MM-YYYY"))
            if(attended.length === 0){
                axios.post(process.env.REACT_APP_API_URL_ATTENDANCE , data)
                .then(res => {
                    setEmployeeName(employeeFullName)
                    setClockInAlert(true)
                })                
            } else{
                const clockingOut = {
                    id: attended[0].id,
                    clockOut: moment(new Date()).format("HH:mm")
                }                
                axios.put(process.env.REACT_APP_API_URL_ATTENDANCE , clockingOut)
                .then(res => {                
                    setEmployeeName(employeeFullName)
                    setClockOutAlert(true)
                }) 
            }   
        })
    }

    const search = (target) => {   
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

    const clockInTimeOutID = setTimeout(() => {
        setClockInAlert(false)
    }, 5000);
    const clockOutTimeOutID = setTimeout(() => {
        setClockOutAlert(false)
    }, 5000);

    useEffect(() => {
        getData()
        return () => {
            clearTimeout(clockInTimeOutID)
            clearTimeout(clockOutTimeOutID)
        }
    }, [setData])

    return (
        <Container fluid className='cst-content-container pt-4 pb-5 position-relative'>
            {(clockInAlert || clockOutAlert) && 
               <ClockAlert 
                text={clockInAlert ? employeeName+" has clocked in" : employeeName+" has clocked out!"}/>
            }
            <div className='d-flex flex-row justify-content-between align-items-center' >
                <h2 className='my-4 fw-light'>Attendance Manager</h2>
                <DateAndTime/>
            </div>
            {data.length > 0 &&
                <>
                    <Row className='mb-5'>
                        <Col xs={5}>
                            <SearchBar
                                placeholder={"Type to search employee by name or code"}
                                search={search}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
                    <TableAttendance
                        data={display}
                        postData={postData}
                    />                
                </>
            }
            {!isLoad && data.length < 1 && !connectionFail && <AttendanceManagerEmpty/>}
            {!isLoad && connectionFail && <ConnectionFailText/>}
            
        </Container>
    )
}

export default AttendanceManagerPage
