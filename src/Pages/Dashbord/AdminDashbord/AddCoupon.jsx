import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { FaSpinner } from "react-icons/fa";
import { Toaster, toast } from 'sonner'
const AddCoupon = () => {
    const [isLoading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(null);
    const { axiosNotSecure } = useAxiosNotSecure()
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
        try {
            const res = await axiosNotSecure.post('/coupon', couponData);
            console.log(res.data);
            if (res?.data) {
                toast.success("Coupon created successfully!");
                setCouponData({ couponText: "", expireDate: "", discountTk: "" });
                setDateTime(null);
            } else {
                throw new Error("Error creating coupon");
            }
        } catch (error) {
            // Handle error response and display the message
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Display API error message
            } else {
                toast.error("Something went wrong. Please try again."); // Default error message
            }
            // console.error("Error:", error.message || error); // Log the error for debugging
        } finally {
            setLoading(false);
        }

    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Toaster />
            <div className="bg-black border-2  p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
                    🎟️ Create New Coupon
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Coupon Text */}
                    <div>
                        <label
                            htmlFor="couponText"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Coupon Text
                        </label>
                        <input
                            type="text"
                            id="couponText"
                            name="couponText"
                            value={couponData.couponText}
                            onChange={handleChange}
                            placeholder="Enter coupon code"
                            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-none focus:outline-none"
                            required
                        />
                    </div>

                    {/* Expire Date */}
                    <div>
                        <label
                            htmlFor="expireDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Expire Date
                        </label>
                        <Flatpickr
                            data-enable-time
                            value={dateTime}
                            onChange={handleDateChange}
                            options={{ dateFormat: "Y-m-d H:i" }}
                            placeholder="Enter Coupon date & time"
                            className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-none focus:outline-none"
                        />
                    </div>

                    {/* Discount Tk */}
                    <div>
                        <label
                            htmlFor="discountTk"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Discount Amount (Tk)
                        </label>
                        <input
                            type="number"
                            id="discountTk"
                            name="discountTk"
                            value={couponData.discountTk}
                            onChange={handleChange}
                            placeholder="Enter discount amount"
                            className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-none focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-500 text-black text-center font-semibold text-white py-3 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <FaSpinner className="animate-spin" />
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            "Submit Coupon"
                        )}
                    </button>
                </form>
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default AddCoupon;