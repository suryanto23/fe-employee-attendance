import React , {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import {Container, Row, Col, Button} from 'react-bootstrap';
import DateAndTime from '../components/DateAndTime';
import TableAttendanceReport from '../components/TableAttendanceReport';
import AttendanceReportEmpty from '../components/AttendanceReportEmpty';
import ConnectionFailText from '../components/ConnectionFailText';
import SearchBar from '../components/SearchBar';
import FilterDateBar from '../components/FilterDateBar';

function AttendanceReportPage() {

    const [data, setData] = useState([])
    const [isLoad, setIsLoad] = useState(false);
    const [connectionFail, setConnectionFail] = useState(false);
    const [display, setDisplay] = useState([])
    const [onFilter, setOnFilter] = useState(false)
    const [filterDate, setFilterDate] = useState(new Date())
    const printRef = useRef();

    const print =  
        useReactToPrint({
            content: () => printRef.current,
            documentTitle: moment(filterDate).format("DD-MM-YYYY")+"-employee-attendance"
        })

    const getData = () => {
        setIsLoad(true)
        axios.get(process.env.REACT_APP_API_URL_ATTENDANCE)
        .then(res => {
            setConnectionFail(false)
            setIsLoad(false)
            setData(res.data)
            const todaysReport = res.data.filter(item => item.attendanceDate == moment(filterDate).format("DD-MM-YYYY"))
            setDisplay(todaysReport)
        })
        .catch(err => {
            if(!err.status){
                setIsLoad(false)
                setConnectionFail(true)
            }
        })
    }
    
    const search = (target) => {
        let searchResult = data.filter(item => (
            item.employee.firstName.toLowerCase().includes(target.toLowerCase()) || 
            item.employee.lastName.toLowerCase().includes(target.toLowerCase()) || 
            (item.employee.firstName.toLowerCase() + " " + item.employee.lastName.toLowerCase()).includes(target.toLowerCase()) || 
            (item.employee.lastName.toLowerCase() + " " + item.employee.firstName.toLowerCase()).includes(target.toLowerCase()) || 
            item.employee.code.toString().includes(target)
            ) && (onFilter ? item.attendanceDate == moment(filterDate).format("DD-MM-YYYY") : true)        
        )
        if(searchResult){
            setDisplay(searchResult)
        } else{
            setDisplay(data)
        }
    }
    
    const handleDate = (targetDate) => {
        setOnFilter(true)
        let filteredDate =  data.filter(item => item.attendanceDate === moment(targetDate).format("DD-MM-YYYY"))
        setDisplay(filteredDate)
    }

    const showAllReport = (targetDate) => {
        setOnFilter(false)
        setDisplay(data)
        setFilterDate(new Date())
    }

    // Default sorting
    if(display) display.sort((a, b) => {
        const aa = a.clockIn.split(':').join("");
        const bb = b.clockIn.split(':').join("");
        return aa < bb ? 1 : (aa > bb ? -1 : 0)
    })
    if(display) display.sort((a, b) => {
        const x = a.attendanceDate.split('-').reverse().join();
        const y = b.attendanceDate.split('-').reverse().join();
        return x < y ? 1 : (x > y ? -1 : 0)
    })

    useEffect(() => {
        getData()
    }, [setData])

    return (
        <Container fluid className='cst-content-container pt-4 pb-5' ref={printRef}>
            <div className='d-flex flex-row justify-content-between align-items-center' >
                <h2 className='my-4 fw-light'>Attendance Report</h2>
                <DateAndTime/>
            </div>
            {data.length > 0 && 
                <>
                   <Row className='d-none d-md-block mb-3 d-md-flex'>
                        <Col xs={5}>
                            <SearchBar
                                placeholder={"Type to search employee by name or code"}
                                search={search}
                            />
                        </Col>
                        <Col xs={2}>
                            <FilterDateBar
                                filterDate={filterDate}
                                setFilterDate={setFilterDate}
                                handleDate={handleDate}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button className='h-100 d-flex flex-row align-items-center cst-dropdown-pop' onClick={() => showAllReport()} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                                <span className='ms-2'>All</span>
                            </Button>
                        </Col>
                    </Row>
                    <Button className='d-none d-md-block mb-3 py-2 px-3 cst-button-pop' onClick={print}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-printer" viewBox="0 0 16 16">
                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                        </svg>
                    </Button>
                    <TableAttendanceReport data={display}/>
                </>
            }
            {!isLoad && display.length < 1 && !connectionFail && <AttendanceReportEmpty/> }
            {!isLoad && connectionFail && <ConnectionFailText/>}
        </Container>
    )
}

export default AttendanceReportPage
