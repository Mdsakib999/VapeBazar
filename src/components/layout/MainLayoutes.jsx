import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';

const MainLayoutes = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-80px)]'>
                <Outlet />
            </div>
            footer
        </div>
    );
};

export default MainLayoutes;