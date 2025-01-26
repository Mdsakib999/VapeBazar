import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaPlus,
    FaList,
    FaTags,
    FaUserCog,
    FaHome,
    FaShoppingCart,
    FaUsers,
    FaClipboardList,
    FaBars,
    FaTimes,
    FaBloggerB,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { SiBackstage } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import useGetMe from "../../../Hooks/useGetMe";

const Sidebar = ({ setOpen, open }) => {
    const { meData } = useGetMe()
    const adminSidebar = [
        { id: 0, title: "Add Product", src: <FaPlus />, link: "/dashboard/admin/add_product" },
        { id: 1, title: "Manage Product", src: <FaList />, link: "/dashboard/admin/manage_product" },
        { id: 2, title: "Add Categories", src: <MdCategory />, link: "/dashboard/admin/add_categories" },
        { id: 3, title: "Manage Categories", src: <BiSolidCategory />, link: "/dashboard/admin/manage_categories" },
        { id: 4, title: "Add Coupon", src: <FaTags />, link: "/dashboard/admin/add_coupon" },
        { id: 5, title: "Manage Coupon", src: <FaTags />, link: "/dashboard/admin/manage_coupon" },
        { id: 5, title: "Add Blog", src: <FaBloggerB />, link: "/dashboard/admin/add_blog" },
        { id: 5, title: "Manage Blog", src: <SiBackstage />, link: "/dashboard/admin/manage_blog" },
        { id: 6, title: "Manage Order", src: <FaShoppingCart />, link: "/dashboard/admin/manage_orders" },
        { id: 7, title: "Manage Users", src: <FaUsers />, link: "/dashboard/admin/manage_users" },
        { id: 8, title: "Home", src: <FaHome />, link: "/" },
    ];

    const userSidebar = [
        { id: 0, title: "Orders", src: <FaClipboardList />, link: "/dashboard/user/orders" },
        { id: 1, title: "Setting", src: <FaUserCog />, link: "/dashboard/user/settings" },
        { id: 2, title: "Home", src: <FaHome />, link: "/", gap: true },
    ];



    const Menus = meData && meData.role === "admin" ? adminSidebar : meData.role == 'user' ? userSidebar : [];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative">
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar */}
            <div
                className={`${open ? "lg:w-72" : "lg:w-20"
                    } bg-gray-900 h-screen fixed overflow-y-auto md:overflow-visible top-0 left-0 z-40 p-5 pt-8 transition-all duration-300 lg:block ${mobileMenuOpen ? "block" : "hidden"
                    }`}
            >
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-x-4 items-center">
                        <img
                            src="/assets/smiley.svg"
                            className={`cursor-pointer duration-500 z-50 ${open && "rotate-[360deg]"}`}
                            alt="Logo"
                        />
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                                }`}
                        >
                            Vape
                        </h1>
                    </div>
                    <img
                        src="/assets/control.png"
                        className={`cursor-pointer w-7 border-dark-purple hidden md:block border-2 rounded-full ${!open && "rotate-180"
                            }`}
                        onClick={() => setOpen(!open)}
                        alt="Toggle Sidebar"
                    />
                </div>
                <ul className="pt-6 ">
                    {Menus.map((Menu) => {
                        const location = useLocation(); // Get the current path
                        const isActive = location.pathname === Menu.link; // Check if the link is active

                        return (
                            <Link to={Menu.link} key={Menu.id}>
                                <li
                                    className={`flex rounded-md p-2 cursor-pointer text-sm items-center gap-x-4 
                    hover:bg-blue-700 text-gray-300 ${Menu.gap ? "mt-9" : "mt-2"} ${isActive ? "bg-blue-700 text-white" : ""
                                        }`}
                                >
                                    <div className="text-xl">{Menu.src}</div>
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </li>
                            </Link>
                        );
                    })}
                </ul>

            </div>

            {/* Overlay for Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
