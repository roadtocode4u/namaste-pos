import React from 'react';
import './Loader.css'

const Loader = ({isLoading}) => {
    return (
        <div className={`loading-container ${isLoading ? '' : 'loading-off'}`}>
            <div className='loading-box'>
            Loading....
            </div>
            
        </div>
    );
};

export default Loader;