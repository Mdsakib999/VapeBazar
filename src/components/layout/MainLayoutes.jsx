import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';

const MainLayoutes = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            footer
        </div>
    );
};

export default MainLayoutes;