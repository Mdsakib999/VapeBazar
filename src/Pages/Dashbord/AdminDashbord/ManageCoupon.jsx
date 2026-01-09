import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from "framer-motion";
import {
    Ticket,
    Trash2,
    Clock,
    Calendar,
    DollarSign,
    AlertCircle,
    Loader2,
    Search,
    ChevronUp,
    ChevronDown,
    Tag,
    Sparkles,
    Gift,
    TimerOff
} from "lucide-react";

const calculateTimeRemaining = (expireDate) => {
    const now = new Date();
    const expireTime = new Date(expireDate);
    const diff = expireTime - now;

    if (diff <= 0) {
        return { text: "Expired", expired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { 
        text: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        expired: false,
        days,
        hours,
        minutes,
        seconds
    };
};

const ManageCoupon = () => {
    const [timeLeft, setTimeLeft] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const { axiosNotSecure } = useAxiosNotSecure();

    const { data: coupons = [], refetch, isLoading } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/coupon`);
            return res.data;
        },
    });

    useEffect(() => {
        if (coupons) {
            const initialTimes = coupons.reduce((acc, coupon) => {
                acc[coupon._id] = calculateTimeRemaining(coupon.expireDate);
                return acc;
            }, {});
            setTimeLeft(initialTimes);

            const timer = setInterval(() => {
                const updatedTimes = coupons.reduce((acc, coupon) => {
                    acc[coupon._id] = calculateTimeRemaining(coupon.expireDate);
                    return acc;
                }, {});
                setTimeLeft(updatedTimes);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [coupons]);

    const handleDelete = async () => {
        if (!selectedCoupon) return;

        try {
            const res = await axiosNotSecure.delete(`/coupon/${selectedCoupon._id}`);
            if (res.data) {
                toast.success("Coupon deleted successfully!");
                refetch();
                setDeleteModalOpen(false);
                setSelectedCoupon(null);
            }
        } catch (error) {
            toast.error("Failed to delete coupon. Please try again.");
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const filteredAndSortedCoupons = coupons
        ?.filter((coupon) =>
            coupon.couponText.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aVal, bVal;
            
            if (sortBy === "date") {
                aVal = new Date(a.expireDate).getTime();
                bVal = new Date(b.expireDate).getTime();
            } else if (sortBy === "discount") {
                aVal = a.discountTk;
                bVal = b.discountTk;
            } else {
                aVal = a.couponText;
                bVal = b.couponText;
            }
            
            if (sortOrder === "asc") {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

    const activeCoupons = coupons?.filter(c => !timeLeft[c._id]?.expired).length || 0;
    const expiredCoupons = coupons?.filter(c => timeLeft[c._id]?.expired).length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50/30 to-purple-50/30 p-4 md:p-6 lg:p-8">
            <Toaster position="top-center" richColors />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Manage Coupons
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                View and manage all discount coupons
                            </p>
                        </div>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex gap-4">
                        <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-100">
                                    <Gift className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Active</p>
                                    <p className="text-xl font-bold text-gray-800">{activeCoupons}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-red-100">
                                    <TimerOff className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Expired</p>
                                    <p className="text-xl font-bold text-gray-800">{expiredCoupons}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

          

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-10"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                    </div>
                ) : filteredAndSortedCoupons?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <Ticket className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No coupons found</p>
                        <p className="text-gray-400 text-sm mt-1">
                            {searchTerm ? "Try adjusting your search" : "Coupons will appear here once created"}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left">
                                        <span className="font-semibold text-gray-700">#</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <button
                                            onClick={() => handleSort("code")}
                                            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-pink-600 transition-colors"
                                        >
                                            Coupon Code
                                            {sortBy === "code" && (
                                                sortOrder === "asc" ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left hidden lg:table-cell">
                                        <button
                                            onClick={() => handleSort("date")}
                                            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                                        >
                                            Expiry Date
                                            {sortBy === "date" && (
                                                sortOrder === "asc" ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="font-semibold text-gray-700">Time Left</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <button
                                            onClick={() => handleSort("discount")}
                                            className="flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                                        >
                                            Discount
                                            {sortBy === "discount" && (
                                                sortOrder === "asc" ? (
                                                    <ChevronUp className="w-4 h-4" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4" />
                                                )
                                            )}
                                        </button>
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        <span className="font-semibold text-gray-700">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredAndSortedCoupons?.map((coupon, index) => {
                                        const timeData = timeLeft[coupon._id] || { text: "Loading...", expired: false };
                                        
                                        return (
                                            <motion.tr
                                                key={coupon._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className={`border-b border-gray-100 hover:bg-purple-100/40 transition-colors group ${
                                                    timeData.expired ? 'opacity-60' : ''
                                                }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-600 font-medium">{index + 1}</span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${timeData.expired ? 'bg-gray-100' : 'bg-purple-100'}`}>
                                                            <Tag className={`w-4 h-4 ${timeData.expired ? 'text-gray-500' : 'text-purple-600'}`} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800 uppercase tracking-wide">
                                                                {coupon.couponText}
                                                            </p>
                                                          
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 hidden lg:table-cell">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(coupon.expireDate).toLocaleDateString()}
                                                        <span className="text-gray-400">
                                                            {new Date(coupon.expireDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {timeData.expired ? (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg">
                                                            <TimerOff className="w-4 h-4" />
                                                            <span className="text-sm font-semibold">Expired</span>
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg">
                                                            <Clock className="w-4 h-4 animate-pulse" />
                                                            <span className="text-sm font-mono font-semibold">
                                                                {timeData.text}
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 rounded-lg bg-violet-100">
                                                            <DollarSign className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <span className="font-bold text-gray-800 text-lg">
                                                            {coupon.discountTk}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => {
                                                                setSelectedCoupon(coupon);
                                                                setDeleteModalOpen(true);
                                                            }}
                                                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}

                {filteredAndSortedCoupons?.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold">{filteredAndSortedCoupons.length}</span> of{" "}
                            <span className="font-semibold">{coupons.length}</span> coupons
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Delete Confirmation Modal */}
            <Transition appear show={deleteModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setDeleteModalOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                        <AlertCircle className="w-8 h-8 text-red-600" />
                                    </div>

                                    <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
                                        Delete Coupon?
                                    </Dialog.Title>
                                    
                                    {selectedCoupon && (
                                        <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4">
                                            <p className="font-mono font-bold text-orange-600">
                                                {selectedCoupon.couponText}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <p className="text-gray-600 mb-6">
                                        This action cannot be undone. This will permanently delete the coupon from your database.
                                    </p>

                                    <div className="flex gap-3 w-full">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setDeleteModalOpen(false)}
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleDelete}
                                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Delete
                                        </motion.button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ManageCoupon;