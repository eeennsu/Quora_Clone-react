import React, { useMemo } from 'react';
import SidebarOption from '../Sidebar/sections/SidebarOption'
import Baseball from '../../Styled/images/Baseball.jpg';
import Car from '../../Styled/images/Car.jpg';
import Fashion from '../../Styled/images/Fashion.jpg';
import Fight from '../../Styled/images/Fight.jpg';
import Food from '../../Styled/images/Food.jpg';

const Sidebar = () => {

    const sidebars = useMemo(() => [
        {
            imgSrc: Baseball,
            title: 'Baseball'
        },
        {
            imgSrc: Car,
            title: 'Car'
        },
        {
            imgSrc: Fashion,
            title: 'Fashion'
        },
        {
            imgSrc: Fight,
            title: 'Fight'
        },
        {
            imgSrc: Food,
            title: 'Food'
        },

    ], []);

    return (
        <nav className='sidebar'>
            {sidebars.map(({ imgSrc, title }) => (
                <SidebarOption key={title} imgSrc={imgSrc} title={title}/>
            ))}
        </nav>
    );
};

export default Sidebar;