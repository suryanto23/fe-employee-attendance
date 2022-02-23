import React from 'react'
import moment from 'moment'
import {Form} from 'react-bootstrap'

function FilterDateBar(props) {

    const triggerSortDate = (e) => {
        props.setFilterDate(e.target.value)
        props.handleDate(e.target.value)
    }
    
    return (
        <Form>
            <Form.Control 
                type="date" 
                className='cst-input-search ' 
                value={moment(props.filterDate).format("YYYY-MM-DD")} 
                onChange={(e) => triggerSortDate(e) } 
            />
        </Form>
    )
}

export default FilterDateBar

