import React from 'react';
import './Progressbar.css'

const Progressbar = ({visible}) => {
    
    return (
        <div className="col-12 mb-5 text-center">
            <div className={`progress-bar ${visible}`} data-label="Loading..."/>
        </div>
        
    );
};

export default Progressbar;