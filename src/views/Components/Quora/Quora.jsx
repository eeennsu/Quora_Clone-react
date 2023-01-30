import React from 'react';
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Widget from '../Widget/Widget';

const Quora = () => {
    return (
        <div className='quora'>
            <Navbar/>
            <div className='quora_content'>
                <Sidebar/>
                <Feed />
                <Widget />
            </div>         
        </div>
    );
};

export default Quora;