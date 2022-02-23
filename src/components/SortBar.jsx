import React , {useState} from 'react';
import {Dropdown} from 'react-bootstrap';

function SortBar(props) {
    const [selected, setSelected] = useState("Sort by")

    const triggerSort = (sortBy) => {
        setSelected(sortBy)
        props.setSort(sortBy)
    }

    return (
        <Dropdown >
            <Dropdown.Toggle id="dropdown-basic" variant="none" className='cst-dropdown-pop'>
                {selected}
            </Dropdown.Toggle>
        
            <Dropdown.Menu>
                <Dropdown.Item className={(selected == "First Name") ? 'cst-highlight' : ''} onClick={() => triggerSort("First Name")}>First Name</Dropdown.Item>
                <Dropdown.Item className={(selected == "Last Name") ? 'cst-highlight' : ''} onClick={() => triggerSort("Last Name")}>Last Name</Dropdown.Item>
                <Dropdown.Item className={(selected == "Employee Code") ? 'cst-highlight' : ''} onClick={() => triggerSort("Employee Code")}>Employee Code</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortBar
