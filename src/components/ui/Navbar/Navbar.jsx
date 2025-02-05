import React, { useContext, useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { getShoppingCart } from "../../../utils/setLocalStorage";
import useGetMe from "../../../Hooks/useGetMe";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const { logout, user, setToken, setIsOpen } = useContext(AuthContext);
    const navigate = useNavigate();
    const { meData } = useGetMe();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Reference for the search dropdown to detect clicks outside
    const searchRef = useRef(null);

    const { data: productData = {} } = useQuery({
        queryKey: ["products", searchTerm],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`, {
                params: { searchItem: searchTerm },
            });
            return res.data;
        },
    });

    const { products = [] } = productData;

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
        // Close the search results when clicked outside of the search area
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchTerm(""); // Close search results when clicked outside
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleNav = () => setNav(!nav);
    const handleSearchCancel = () => setSearchTerm("");

    const handelNavigateDashboard = () => {
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
    };

    const navItems = [
        { id: 1, text: "Home", link: "/" },
        { id: 2, text: "Product", link: "/product" },
        { id: 3, text: "Contact", link: "/contact" },
    ];

    return (
        <div className="fixed top-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white z-50 shadow-lg">
            <div className="flex justify-between items-center max-w-[1240px] mx-auto px-5 py-4">
                {/* Logo */}
                <Link to="/">
                    <p className='-mt-5 text-3xl font-bold font-Dancing text-textColor'>V<span className="hidden md:inline-block">ape</span><span className='font-bold bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent text-gradient'>Bazara</span></p>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link to={item.link} key={item.id} className="hover:text-blue-400 transition">
                            {item.text}
                        </Link>
                    ))}
                </ul>

                {/* Search Bar */}
                <div ref={searchRef} className="hidden lg:flex items-center relative w-80">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="px-4 py-2 w-full rounded-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <AiOutlineSearch className="absolute top-3 right-10 text-gray-400" size={20} />
                        {searchTerm && (
                            <AiOutlineClose
                                className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                                size={20}
                                onClick={handleSearchCancel}
                            />
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {searchTerm && (
                        <div className="absolute top-12 left-0 w-96 bg-white shadow-lg rounded-lg overflow-hidden">
                            <ul className="max-h-60 overflow-y-auto">
                                {products.length > 0 ? (
                                    products.map((item) => (
                                        <Link
                                            to={`/product/${item._id}`}
                                            key={item._id}
                                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-500">${item.price}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center py-4">
                                        <AiOutlineShoppingCart className="text-gray-400" size={30} />
                                        <p className="text-gray-500 ml-2">No products found</p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* User Account and Cart */}
                <div className="flex items-center gap-5">
                    <div className="relative cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                        <IoCart size={26} />
                        <span className="absolute -top-3 -right-2 bg-blue-500 text-sm font-bold text-white px-2 rounded-full">
                            {data.length || 0}
                        </span>
                    </div>
                    {user ? (
                        <div className="relative">
                            <span
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className="flex items-center cursor-pointer gap-1 hover:text-blue-400 transition"
                            >
                                <FaUser size={20} /> Account
                            </span>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                                    <ul className="flex flex-col">
                                        <li
                                            onClick={handelNavigateDashboard}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Dashboard
                                        </li>
                                        <li
                                            onClick={handelNavigate}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1 hover:text-blue-400 transition">
                            <FaSignInAlt size={20} /> Login
                        </Link>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center">
                    <div onClick={handleNav}>{nav ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}</div>
                </div>
            </div >

            {/* Mobile Menu */}
            {
                nav && (
                    <div className="absolute top-0 left-0 w-full h-screen bg-gray-900 text-white lg:hidden">
                        <div className="flex justify-end p-4">
                            <AiOutlineClose size={26} onClick={handleNav} className="cursor-pointer" />
                        </div>
                        <ul className="flex flex-col items-center gap-6 mt-10 text-lg">
                            {navItems.map((item) => (
                                <Link to={item.link} key={item.id} onClick={handleNav}>
                                    {item.text}
                                </Link>
                            ))}
                        </ul>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
