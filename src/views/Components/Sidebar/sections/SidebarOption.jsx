import React, { memo } from 'react';

const SidebarOption = ({ imgSrc, title }) => {
    
    return (
        <div className='sidebarOptions'>
            <div className='sidebarOption'>
                <img src={imgSrc} alt='fashion'/>
                <p>{title}</p>
            </div>            
        </div>
    );
};

export default memo(SidebarOption);