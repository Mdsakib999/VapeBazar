import React from 'react';
import Sidebar from '../ui/DashbordComponents/Sidebar';
import { Outlet } from 'react-router-dom';

const DashbordLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default DashbordLayout;