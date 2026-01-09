import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import {
    Ticket,
    Calendar,
    DollarSign,
    Tag,
    Loader2,
    Save,
    Sparkles,
    AlertCircle,
    CheckCircle,
    Gift,
    Clock,
    Percent
} from "lucide-react";

const AddCoupon = () => {
    const [isLoading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { axiosNotSecure } = useAxiosNotSecure();
    const [couponData, setCouponData] = useState({
        couponText: "",
        expireDate: "",
        discountTk: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date) => {
        setDateTime(date);
        setCouponData((prevData) => ({ ...prevData, expireDate: date[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!couponData.expireDate) {
            return toast.error("Please set an expiration date.");
        }

        setLoading(true);
        setUploadSuccess(false);
        try {
            const res = await axiosNotSecure.post('/coupon', couponData);
            if (res?.data) {
                toast.success("Coupon created successfully!");
                setUploadSuccess(true);
                setTimeout(() => {
                    setCouponData({ couponText: "", expireDate: "", discountTk: "" });
                    setDateTime(null);
                    setUploadSuccess(false);
                }, 2000);
            } else {
                throw new Error("Error creating coupon");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 p-4 md:p-8">
            <Toaster position="top-center" richColors />

            {/* Success Toast */}
            <AnimatePresence>
                {uploadSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-bold">Success!</p>
                            <p className="text-sm">Coupon created successfully</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-xl">
                            <Ticket className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                        Create New Coupon
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Generate discount coupons for your customers
                    </p>
                        </div>
                    </div>
                    
                </motion.div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header Banner */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-8">
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                    <Gift className="w-7 h-7" />
                                    Coupon Details
                                </h2>
                                <p className="text-white/90 mt-2">Fill in the discount coupon information</p>
                            </div>
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Coupon Code */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <div className="p-1.5 rounded-lg bg-purple-100">
                                                <Tag className="w-4 h-4 text-pink-600" />
                                            </div>
                                            Coupon Code
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="couponText"
                                            value={couponData.couponText}
                                            onChange={handleChange}
                                            placeholder="e.g., SUMMER2024, SAVE20"
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 text-gray-800 font-semibold uppercase"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            Use uppercase letters and numbers for better readability
                                        </p>
                                    </motion.div>

                                    {/* Discount Amount */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <div className="p-1.5 rounded-lg bg-purple-100">
                                                <Percent className="w-4 h-4 text-pink-600" />
                                            </div>
                                            Discount Amount
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="number"
                                                name="discountTk"
                                                value={couponData.discountTk}
                                                onChange={handleChange}
                                                placeholder="Enter discount amount"
                                                className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 text-gray-800 font-semibold"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Amount will be deducted from the total order value
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Expiration Date */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <div className="p-1.5 rounded-lg bg-purple-100">
                                                <Calendar className="w-4 h-4 text-pink-600" />
                                            </div>
                                            Expiration Date & Time
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
                                            <Flatpickr
                                                data-enable-time
                                                value={dateTime}
                                                onChange={handleDateChange}
                                                options={{
                                                    dateFormat: "Y-m-d H:i",
                                                    minDate: "today"
                                                }}
                                                placeholder="Select date and time"
                                                className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all duration-200 text-gray-800 font-semibold"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Coupon will expire at the selected date and time
                                        </p>
                                    </motion.div>

                                    {/* Preview Card */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-gradient-to-br from-pink-50 to-pink-50 rounded-2xl p-6  shadow-xl"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className="w-5 h-5" />
                                            <h3 className="font-bold text-lg">Preview</h3>
                                        </div>
                                        <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-4 border-2 border-gray-400 border-dashed">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-600 mb-1">Coupon Code</p>
                                                <p className="text-2xl font-black tracking-wider text-gray-600 mb-3">
                                                    {couponData.couponText || "YOURCODE"}
                                                </p>
                                                <div className="flex items-center justify-center gap-2 text-sm">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span className="font-bold">
                                                        {couponData.discountTk || "0"} OFF
                                                    </span>
                                                </div>
                                                {dateTime && (
                                                    <p className="text-xs text-white/80 mt-3 flex items-center justify-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Valid until {new Date(dateTime[0]).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t-2 border-gray-100"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Creating Coupon...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-6 h-6" />
                                            Create Coupon
                                        </>
                                    )}
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => {
                                        setCouponData({ couponText: "", expireDate: "", discountTk: "" });
                                        setDateTime(null);
                                    }}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="sm:w-auto px-8 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-lg"
                                >
                                    Reset
                                </motion.button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>

                
            </div>
        </div>
    );
};

export default AddCoupon;