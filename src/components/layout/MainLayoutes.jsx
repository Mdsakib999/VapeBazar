import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import Footer from '../ui/Footer/Footer';

const MainLayoutes = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-80px)] mt-[85px] relative '>
                <Outlet />
                <span onClick={handleScrollToTop} className='absolute bottom-5 right-5 cursor-pointer  border-2 border-gray-700  p-2 rounded-full animate-bounce'>
                    <svg data-slot="icon" className='size-5' fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"></path>
                    </svg>
                </span>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayoutes;