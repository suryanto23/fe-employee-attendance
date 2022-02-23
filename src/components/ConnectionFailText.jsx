import React from 'react'

function ConnectionFailText() {
    return (
        <div className='text-center my-5 py-5'>
            <h3 className='fw-bold'>Your Database is Offline</h3>
            <p className='fw-light'>Please ensure you have turn on your local database</p>
        </div>
    )
}

export default ConnectionFailText
