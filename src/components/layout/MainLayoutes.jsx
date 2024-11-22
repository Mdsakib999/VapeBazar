import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar/Navbar';
import Footer from '../ui/Footer/Footer';

const MainLayoutes = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow mt-[85px] min-h-[calc(100vh-80px)]">
                <Outlet />
            </div>
            <Footer />
            <div
                onClick={handleScrollToTop}
                className="fixed bottom-5 right-5 cursor-pointer border-2 border-gray-700 p-2 rounded-full animate-bounce bg-white hover:bg-gray-200 transition"
            >
                <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                </svg>
            </div>
        </div>
    );
};

export default MainLayoutes;
