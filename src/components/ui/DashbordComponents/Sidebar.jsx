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
    FaChevronLeft,
    FaAngleRight,
} from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { SiBackstage } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import useGetMe from "../../../Hooks/useGetMe";

const Sidebar = ({ setOpen, open }) => {
    const { meData } = useGetMe();
    const adminSidebar = [
        { id: 0, title: "Manage Order", src: <FaShoppingCart />, link: "/dashboard/admin/manage_orders" },
        { id: 1, title: "Add Product", src: <FaPlus />, link: "/dashboard/admin/add_product" },
        { id: 2, title: "Manage Product", src: <FaList />, link: "/dashboard/admin/manage_product" },
        { id: 3, title: "Manage Users", src: <FaUsers />, link: "/dashboard/admin/manage_users" },
        { id: 4, title: "Add Categories", src: <MdCategory />, link: "/dashboard/admin/add_categories" },
        { id: 5, title: "Manage Categories", src: <BiSolidCategory />, link: "/dashboard/admin/manage_categories" },
        { id: 6, title: "Add Coupon", src: <FaTags />, link: "/dashboard/admin/add_coupon" },
        { id: 7, title: "Manage Coupon", src: <FaTags />, link: "/dashboard/admin/manage_coupon" },
        { id: 8, title: "Add New Blog", src: <FaBloggerB />, link: "/dashboard/admin/add_blog" },
        { id: 9, title: "Manage Blog", src: <SiBackstage />, link: "/dashboard/admin/manage_blog" },
        { id: 10, title: "Home", src: <FaHome />, link: "/" },
    ];

    const userSidebar = [
        { id: 0, title: "My Orders", src: <FaClipboardList />, link: "/dashboard/user/orders" },
        { id: 1, title: "Profile Setting", src: <FaUserCog />, link: "/dashboard/user/settings" },
        { id: 2, title: "Home", src: <FaHome />, link: "/" },
    ];

    const Menus = meData && meData.role === "admin" ? adminSidebar : meData.role == 'user' ? userSidebar : [];

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="relative">
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar */}
            <div
                className={`${
                    open ? "lg:w-72" : "lg:w-20"
                } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-screen fixed overflow-hidden top-0 left-0 z-40 transition-all duration-300 lg:block border-r border-gray-700 shadow-2xl flex flex-col ${
                    mobileMenuOpen ? "block w-72" : "hidden"
                }`}
            >
                {/* Header Section */}
                <div className="p-5 pt-6 flex-shrink-0">
                    <div className={`flex items-center mb-8 ${open ? 'justify-between' : 'flex-col gap-4'}`}>
                        <div className="flex gap-x-3 items-center min-w-0">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full blur-md opacity-50"></div>
                                <img
                                    src="/assets/6558654.png"
                                    className={`cursor-pointer w-12 h-12 duration-500 relative z-10 ${
                                        open && "rotate-[360deg]"
                                    }`}
                                    alt="Logo"
                                />
                            </div>
                            <h1
                                className={`text-white origin-left font-bold text-2xl duration-300 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent overflow-hidden ${
                                    !open && "w-0 opacity-0"
                                }`}
                            >
                                Vape
                            </h1>
                        </div>
                        
                        {/* Desktop Toggle Button */}
                        <button
                            className={`hidden lg:flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-110 flex-shrink-0 `}
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <FaChevronLeft className="text-white text-sm " />
                            ) : (
                                <FaAngleRight className="text-white text-sm " />
                            )}
                        </button>
                    </div>

                    {/* User Info Section */}
                    {meData && (
                        <div className={` pb-6 border-b border-gray-700 transition-all duration-300 ${!open && "opacity-0 h-0 overflow-hidden mb-0 pb-0 border-0"}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                                    {meData.email ? meData.email[0].toUpperCase() : "U"}
                                </div>
                                <div className={`min-w-0 flex-1 overflow-hidden ${!open && "w-0 opacity-0"}`}>
                                    <p className="text-white font-semibold text-sm truncate">
                                        {meData.email || "User"}
                                    </p>
                                    <p className="text-green-500 text-xs capitalize">
                                        {meData.role || "Member"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Menu Items - Scrollable */}
                <nav className="px-3 flex-1 overflow-y-auto overflow-x-hidden">
                    <ul className="space-y-2 pb-6">
                        {Menus.map((Menu) => {
                            const location = useLocation();
                            const isActive = location.pathname === Menu.link;

                            return (
                                <Link to={Menu.link} key={Menu.id}>
                                    <li
                                        className={`group flex items-center gap-x-4 p-3 rounded-xl cursor-pointer transition-all duration-300  ${
                                            isActive
                                                ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                                                : "text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-05"
                                        } ${Menu.gap ? "mt-9" : ""}`}
                                    >
                                        <div
                                            className={`text-xl transition-all duration-300 flex-shrink-0 ${
                                                isActive ? "scale-110" : "group-hover:scale-110"
                                            }`}
                                        >
                                            {Menu.src}
                                        </div>
                                        <span
                                            className={`origin-left duration-300 font-medium text-sm whitespace-nowrap overflow-hidden ${
                                                !open && "w-0 opacity-0"
                                            }`}
                                        >
                                            {Menu.title}
                                        </span>
                                        
                                        {/* Active Indicator */}
                                        {isActive && open && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0"></div>
                                        )}
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Section */}
                <div className={`flex-shrink-0 p-5 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${!open && "opacity-0 h-0 overflow-hidden p-0 border-0"}`}>
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
                        <span className={`overflow-hidden ${!open && "w-0 opacity-0"}`}>System Active</span>
                    </div>
                </div>
            </div>

            {/* Overlay for Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;