import React, { useState } from 'react';
import Sidebar from '../ui/DashbordComponents/Sidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner'

const DashbordLayout = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex h-fit">
            <Sidebar open={open} setOpen={setOpen} />
            <div className={`flex-grow overflow-hidden transition-all duration-300 ${open ? ' md:ml-72' : ' ml-16 md:ml-20'} sm:ml-20 lg:${open ? 'ml-72' : 'ml-20'}`}>
                <div className=''>
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default DashbordLayout;