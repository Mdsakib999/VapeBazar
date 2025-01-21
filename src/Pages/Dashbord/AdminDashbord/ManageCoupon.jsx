import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'sonner'

const calculateTimeRemaining = (expireDate) => {
    const now = new Date();
    const expireTime = new Date(expireDate);
    const diff = expireTime - now;

    if (diff <= 0) {
        return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const ManageCoupon = () => {
    const [timeLeft, setTimeLeft] = useState({});
    const { axiosNotSecure } = useAxiosNotSecure()
    const { data: coupons = [], refetch, isLoading } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/coupon`);
            return res.data;
        },
    });

    useEffect(() => {
        if (coupons) {
            // Initialize time remaining for each coupon
            const initialTimes = coupons.reduce((acc, coupon) => {
                acc[coupon._id] = calculateTimeRemaining(coupon.expireDate);
                return acc;
            }, {});
            setTimeLeft(initialTimes);

            // Update the countdown timer every second
            const timer = setInterval(() => {
                const updatedTimes = coupons.reduce((acc, coupon) => {
                    acc[coupon._id] = calculateTimeRemaining(coupon.expireDate);
                    return acc;
                }, {});
                setTimeLeft(updatedTimes);
            }, 1000);

            // Cleanup the timer on component unmount
            return () => clearInterval(timer);
        }
    }, [coupons]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            try {
                const res = await axiosNotSecure.delete(`/coupon/${id}`);
                if (res.data) {
                    toast.success("Coupon deleted successfully!");
                    refetch()
                }
            } catch (error) {
                toast.error("Failed to delete coupon. Please try again.");
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    // if (error) return <p>Something went wrong. Please try again.</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen ">
            <div className="bg-white rounded-lg shadow-lg px-4 pb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center  pt-5">Manage & Update Coupons</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">#</th>
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">Coupon Text</th>
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700 ">Expire Date</th>
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">Countdown</th>
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">Discount (Tk)</th>
                                <th className="px-4 py-2 border text-center text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons?.length > 0 ? (
                                coupons?.map((coupon, index) => (
                                    <tr key={coupon._id} className="hover:bg-orange-50">
                                        <td className="px-4 py-2 border text-sm text-gray-800">{index + 1}</td>
                                        <td className="px-4 py-2 text-center border text-gray-800">{coupon.couponText}</td>
                                        <td className="px-4 py-2 text-center border text-sm text-gray-800">{new Date(coupon.expireDate).toLocaleString()}</td>
                                        <td className="px-4 py-2 border text-center text-sm text-gray-800">
                                            {timeLeft[coupon._id] || "Loading..."}
                                        </td>
                                        <td className="px-4 py-2 text-center border text-gray-800">{coupon.discountTk}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                className="text-red-600 hover:text-red-800 transition duration-200"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-800">
                                        No coupons Available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCoupon;
