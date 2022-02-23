import React , {useState, useEffect} from 'react'
import moment from 'moment';

function DateAndTime() {

    const [time, setTime] = useState("")

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(moment(new Date()).format("HH:mm:ss"))
        }, 0);    
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className='d-flex flex-row cst-dateTime-container'> 
            <p className='m-0 p-2 fw-light cst-date'>{moment(new Date()).format("dddd, DD-MM-YYYY")}</p>
            {time && <p className='d-none d-md-block m-0 p-2 fw-bold cst-time'>{time}</p>}
        </div>
    )
}

export default DateAndTime
