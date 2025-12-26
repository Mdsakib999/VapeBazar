import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const LoginPage = () => {
    const { login, googleLogin } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const { email, password } = data
        const res = await login(email, password)
        if (res) {
            navigate("/")
        }
    };
    const handelGoogleLogin = async () => {
        const res = await googleLogin()
        if (res) {
            navigate('/')
            const res2 = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user`, { email: res.user.email })

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="mt-1 w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Input with Toggle */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className="mt-1 w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="px-4 text-sm text-gray-400">or continue with</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handelGoogleLogin}
                    className="w-full flex items-center justify-center py-2 px-4 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
                >
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign in with Google
                </button>

                {/* Link to Register Page */}
                <p className="text-center text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-500 hover:underline hover:text-indigo-400"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
