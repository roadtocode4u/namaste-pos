import React from 'react'

import './Heading.css'

function Heading({title}) {
    return (
        <>
        <div className='heading-container mb-3'>
            <h3 className='text-center'>{title}</h3>
        </div>
        </>
    )
}

export default Heading