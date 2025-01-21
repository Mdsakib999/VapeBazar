import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setOpen, open }) => {

    const Menus = [
        { title: "Add Product", src: "Overview", link: '/dashboard/admin/add_product' },
        { title: "Menage product", src: "Transactions", link: '/dashboard/admin/manage_product' },
        { title: "Add Categories", src: "Card", gap: true, link: '/dashboard/admin/add_categories' },
        { title: "Manage Categories", src: "Calendar", link: '/dashboard/admin/manage_categories' },
        { title: "Add Coupon", src: "Debt", link: '/dashboard/admin/add_coupon' },
        { title: "Manage Coupon", src: "Debt", link: '/dashboard/admin/manage_coupon' },
        { title: "Manage Order", src: "Debt", link: '/dashboard/admin/manage_orders' },
        { title: "Home", src: "Debt", link: '/' },
        { title: "Legal information", src: "Legal" },
        { title: "Notifications ", src: "Notifications", gap: true },
        { title: "Setting", src: "Settings" },
    ];

    return (
        <div className="flex overflow-y-auto border-l-2">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-backgroundColor h-screen fixed overflow-y-auto overflow-x-hidden top-0 left-0  p-5  pt-8  duration-300`}
            >
                <img
                    src="/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="/assets/smiley.svg"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Vape
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link
                            to={Menu.link}
                            key={index}>
                            <li
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <img src={`/assets/${Menu.src}.svg`} />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
