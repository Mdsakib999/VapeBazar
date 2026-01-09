import React, { useContext, useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { getShoppingCart } from "../../../utils/setLocalStorage";
import useGetMe from "../../../Hooks/useGetMe";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Home, Phone, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [scrolled, setScrolled] = useState(false);
    const { logout, user, setToken, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { meData } = useGetMe();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    const { data: productData = {} } = useQuery({
        queryKey: ["products", searchTerm],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { searchItem: searchTerm },
            });
            return res.data;
        },
        enabled: searchTerm.length > 0,
    });

    const { products = [] } = productData;

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = () => {
            const localData = getShoppingCart();
            setData(localData);
        };
        window.addEventListener("shopping-cart-updated", fetchData);
        fetchData();
        return () => {
            window.removeEventListener("shopping-cart-updated", fetchData);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchTerm("");
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNav = () => setNav(!nav);
    const handleSearchCancel = () => setSearchTerm("");

    const handelNavigateDashboard = () => {
        setIsDropdownOpen(false);
        if (meData?.role === "admin") {
            navigate("/dashboard/admin/add_product");
        } else if (meData?.role === "user") {
            navigate("/dashboard/user/orders");
        } else {
            navigate("/");
        }
    };

    const handelNavigate = () => {
        if (user) {
            logout();
            localStorage.removeItem("auth");
            setToken(null);
        } else {
            navigate("/login");
        }
        setIsDropdownOpen(false);
    };

    const navItems = [
        { id: 1, text: "Home", link: "/", icon: <Home size={18} /> },
        { id: 2, text: "Products", link: "/product", icon: <Package size={18} /> },
        { id: 3, text: "Contact", link: "/contact", icon: <Phone size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-gray-900/95 backdrop-blur-lg shadow-2xl"
                        : "bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900"
                }`}
            >
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <p className="text-3xl md:text-4xl font-bold">
                                    <span className="text-white">Vape</span>
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                                        Bazar
                                    </span>
                                </p>
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.link}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                                        isActive(item.link)
                                            ? "bg-white/10 text-white"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {item.icon}
                                    {item.text}
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div ref={searchRef} className="hidden lg:block relative w-80">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/20 transition-all"
                                />
                                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                {searchTerm && (
                                    <AiOutlineClose
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white transition-colors"
                                        size={20}
                                        onClick={handleSearchCancel}
                                    />
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {searchTerm && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                                    >
                                        <div className="max-h-96 overflow-y-auto">
                                            {products.length > 0 ? (
                                                products.map((item) => (
                                                    <Link
                                                        to={`/product/${item._id}`}
                                                        key={item._id}
                                                        onClick={() => setSearchTerm("")}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-14 h-14 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-sm text-purple-600 font-bold">
                                                                Dhs {item.price}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8">
                                                    <AiOutlineShoppingCart className="text-gray-300" size={40} />
                                                    <p className="text-gray-500 mt-2">No products found</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Cart */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <IoCart size={28} className="text-white" />
                                {data.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-xs font-bold text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                                        {data.length}
                                    </span>
                                )}
                            </motion.button>

                            {/* User Account */}
                            {user ? (
                                <div className="relative hidden lg:block" ref={dropdownRef}>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold shadow-lg text-white"
                                    >
                                        <FaUser size={16} />
                                        <span>Account</span>
                                        <FaChevronDown
                                            size={12}
                                            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </motion.button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                                            >
                                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white">
                                                    <p className="font-semibold truncate">{user.email || "User"}</p>
                                                    <p className="text-xs text-white/80 capitalize">{meData?.role || "Member"}</p>
                                                </div>
                                                <ul>
                                                    <li
                                                        onClick={handelNavigateDashboard}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors text-gray-700"
                                                    >
                                                        <LayoutDashboard size={18} />
                                                        <span className="font-medium">Dashboard</span>
                                                    </li>
                                                    <li
                                                        onClick={handelNavigate}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors text-red-600 border-t border-gray-100"
                                                    >
                                                        <LogOut size={18} />
                                                        <span className="font-medium">Logout</span>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all font-semibold shadow-lg"
                                >
                                    <FaUser size={16} />
                                    Login
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNav}
                                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                            >
                                {nav ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {nav && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden "
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleNav} />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 via-indigo-900 to-purple-900 shadow-2xl overflow-y-auto"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={handleNav}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    <AiOutlineClose size={26} className="text-white" />
                                </button>
                            </div>

                            {/* Mobile Search */}
                            <div className="px-4 mb-5 pt-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-2 bg-white rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto"
                                        >
                                            {products.length > 0 ? (
                                                products.map((item) => (
                                                    <Link
                                                        to={`/product/${item._id}`}
                                                        key={item._id}
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            handleNav();
                                                        }}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-sm text-indigo-600 font-bold">
                                                                Dhs {item.price}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8">
                                                    <AiOutlineShoppingCart className="text-gray-300" size={40} />
                                                    <p className="text-gray-500 mt-2">No products found</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* User Info */}
                            {user && (
                                <div className="px-4 mb-6">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                                <FaUser size={20} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-semibold truncate">
                                                    {user.email || "User"}
                                                </p>
                                                <p className="text-gray-400 text-sm capitalize">
                                                    {meData?.role || "Member"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <nav className="px-4">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <Link
                                                to={item.link}
                                                onClick={handleNav}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                                                    isActive(item.link)
                                                        ? "bg-white text-indigo-600"
                                                        : "text-white hover:bg-white/10"
                                                }`}
                                            >
                                                {item.icon}
                                                {item.text}
                                            </Link>
                                        </li>
                                    ))}

                                    {user && (
                                        <>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        handelNavigateDashboard();
                                                        handleNav();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
                                                >
                                                    <LayoutDashboard size={18} />
                                                    Dashboard
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        handelNavigate();
                                                        handleNav();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-500/10 transition-all"
                                                >
                                                    <LogOut size={18} />
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    )}

                                    {!user && (
                                        <li>
                                            <Link
                                                to="/login"
                                                onClick={handleNav}
                                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all"
                                            >
                                                <FaUser size={16} />
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;