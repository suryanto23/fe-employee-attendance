import React , {useState} from 'react'
import {Form} from 'react-bootstrap'

function SearchBar(props) {
    const [name, setName] = useState("")
    const triggerSearch = (e) => {
        setName(e.target.value)
        props.search(e.target.value)
    }
    return (
        <Form>
            <Form.Control type="text" placeholder={props.placeholder} className='cst-input-search' value={name} onChange={(e) => triggerSearch(e) }/>
        </Form>
    )
}

export default SearchBar
