import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import './Navbar.css'
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";



const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home' },
        { id: 2, text: 'Company' },
        { id: 3, text: 'Product' },
        { id: 4, text: 'About' },
        { id: 5, text: 'Contact' },
    ];
    return (
        <div className='fixed top-0 w-full bg-[#2C2C2C] text-white z-50 font-Poppins'>
            <div className=' flex  justify-between items-center  max-w-[1240px] mx-auto  px-5 lg:px-0 py-11 md:py-0 text-black'>
                {/* Logo */}
                <div className='flex  justify-between items-center md:h-[90px] w-[60%]'>
                    <div className='hidden lg:block'>

                        <p className='-mt-5 text-3xl font-bold font-Dancing text-textColor'>Vape<span className='font-bold bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent text-gradient'>Bazara</span></p>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className='hidden lg:flex gap-5  '>
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className=' nav_a rounded-xl  cursor-pointer '
                            >
                                {item.text}
                            </li>

                        ))}
                    </ul>
                    {/* Mobile Navigation Icon */}
                    <div onClick={handleNav} className='block lg:hidden'>
                        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                    </div>
                </div>
                <div className='flex items-end gap-3'>
                    <div className='relative cursor-pointer '>
                        <span className='bg-orange-300 absolute px-1 rounded-full text-sm font-bold -top-5 left-1 '>0</span>
                        <p className='font-bold flex  items-center text-white hover:text-black -mt-1'> <IoCart size={26} />Cart</p>
                    </div>
                    <div >
                        <p className='font-bold cursor-pointer flex justify-center transition-all duration-300 items-center   hover:text-black -mt-1 text-textColor'> <FaUser size={24} />Account</p>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <ul
                    className={
                        nav
                            ? 'fixed lg:hidden right-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-backgroundColor ease-in-out duration-500'
                            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]'
                    }
                >
                    {/* Mobile Logo */}
                    <p className=' ps-5 pt-2 text-3xl font-bold font-Dancing text-white'>Vape<span className='font-bold bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent text-gradient'>Bazara</span></p>

                    {/* Mobile Navigation Items */}
                    {navItems.map(item => (
                        <li
                            key={item.id}
                            className='p-4 border-b rounded-xl text-white  duration-300  cursor-pointer border-gray-600'
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;