import React, { useState } from "react";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingBag, Truck, CheckCircle, Clock, XCircle, Search, Loader2, Receipt, DollarSign, Tag } from 'lucide-react';

const Orders = () => {
    const { axiosNotSecure } = useAxiosNotSecure()
    const [search, setSearch] = useState('')
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['order', search],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/order`, {
                params: { search }
            });
            return res.data;
        },
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getStatusConfig = (status) => {
        const configs = {
            "Delivered": {
                icon: <CheckCircle className="w-6 h-6" />,
                gradient: "from-green-500 to-emerald-600",
                bgColor: "bg-green-50",
                textColor: "text-green-700",
                borderColor: "border-green-300"
            },
            "Shipped": {
                icon: <Truck className="w-6 h-6" />,
                gradient: "from-blue-500 to-cyan-600",
                bgColor: "bg-blue-50",
                textColor: "text-blue-700",
                borderColor: "border-blue-300"
            },
            "Processing": {
                icon: <Clock className="w-6 h-6" />,
                gradient: "from-yellow-500 to-orange-600",
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-700",
                borderColor: "border-yellow-300"
            },
            default: {
                icon: <XCircle className="w-6 h-6" />,
                gradient: "from-red-500 to-rose-600",
                bgColor: "bg-red-50",
                textColor: "text-red-700",
                borderColor: "border-red-300"
            }
        };
        return configs[status] || configs.default;
    };

    return (
        <div className="min-h-screen  py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Glassmorphism Header */}
                <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-3 ">
                                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg">
                                        <Receipt className="w-8 h-8 text-white" />
                                    </div>
                                    <div>

                                    <h1 className="text-3xl md:text-4xl font-black text-white">
                                        My Orders
                                    </h1>
                                    <p className="text-purple-100 text-lg mt-2">
                                    {orders.length} {orders.length === 1 ? 'order' : 'orders'} in your history
                                </p>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Enhanced Search */}
                            <div className="w-full md:w-96">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by Order ID..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-md border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 shadow-xl text-gray-800 placeholder-gray-500 font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 rounded-full animate-ping"></div>
                        </div>
                        <p className="text-gray-400 mt-6 text-lg font-medium">Loading your orders...</p>
                    </div>
                ) : orders?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {orders?.map((order, orderIndex) => {
                            const statusConfig = getStatusConfig(order.orderStatus);
                            return (
                                <div
                                    key={order._id}
                                    className="group bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-purple-500"
                                >
                                    {/* Order Header with Status */}
                                    <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-5 border-b border-gray-700">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`bg-gradient-to-br ${statusConfig.gradient} p-3 rounded-2xl shadow-lg`}>
                                                    {statusConfig.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                        Order #{order.orderId}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        Track your package status
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className={`inline-flex items-center gap-3 px-5 py-3 ${statusConfig.bgColor} rounded-2xl border-2 ${statusConfig.borderColor} shadow-lg`}>
                                                {statusConfig.icon}
                                                <span className={`font-bold ${statusConfig.textColor} text-lg`}>
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                            {/* Products Section - Takes 2 columns */}
                                            <div className="xl:col-span-2">
                                                <div className="flex items-center gap-2 mb-5">
                                                    <Package className="w-5 h-5 text-purple-400" />
                                                    <h4 className="text-lg font-bold text-white">Products</h4>
                                                    <span className="text-sm text-gray-400">({order?.product?.length} items)</span>
                                                </div>
                                                
                                                <div className="space-y-3">
                                                    {order?.product?.map((item, index) => (
                                                        <div 
                                                            key={index}
                                                            className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group/item"
                                                        >
                                                            <div className="relative">
                                                                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-700 group-hover/item:border-purple-500 transition-all duration-300 shadow-lg">
                                                                    <img
                                                                        src={item?.productId?.image}
                                                                        alt={item.productId.name}
                                                                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                                                    />
                                                                </div>
                                                                <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                                                    {item.quantity}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-white text-base truncate">
                                                                    {item.productId.name}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <span className="text-sm text-gray-400">
                                                                        Qty: {item.quantity}
                                                                    </span>
                                                                    {item.nicotineStrength && (
                                                                        <span className="text-xs px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-md">
                                                                            {item.nicotineStrength}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="text-right">
                                                                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                                    Dhs {item.productId.price}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Payment Summary - Takes 1 column */}
                                            <div className="xl:col-span-1">
                                                <div className="sticky top-4">
                                                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
                                                        <div className="flex items-center gap-2 mb-6">
                                                            <DollarSign className="w-5 h-5 text-green-400" />
                                                            <h4 className="text-lg font-bold text-white">Payment Summary</h4>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                                <span className="text-gray-400 font-medium">Subtotal</span>
                                                                <span className="text-white font-semibold">Dhs {order.totalAmount}</span>
                                                            </div>
                                                            
                                                            <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                                <span className="text-gray-400 font-medium flex items-center gap-1">
                                                                    <Truck className="w-4 h-4" />
                                                                    Shipping
                                                                </span>
                                                                <span className="text-white font-semibold">Dhs {order.shippingFee}</span>
                                                            </div>
                                                            
                                                            {order.discount && (
                                                                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                                                                    <span className="text-green-400 font-medium flex items-center gap-1">
                                                                        <Tag className="w-4 h-4" />
                                                                        Discount
                                                                    </span>
                                                                    <span className="text-green-400 font-semibold">-Dhs {order.discount}</span>
                                                                </div>
                                                            )}
                                                            
                                                            <div className="pt-4 mt-2">
                                                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 shadow-lg">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-white font-bold text-lg">Total</span>
                                                                        <span className="text-white font-black text-2xl">
                                                                            Dhs {order?.discount 
                                                                                ? (Number(order?.totalAmount) + Number(order?.shippingFee)) - Number(order?.discount) 
                                                                                : (Number(order?.totalAmount) + Number(order?.shippingFee))}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-800 rounded-full mb-8 shadow-2xl border-4 border-gray-700">
                            <ShoppingBag className="w-16 h-16 text-gray-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">No Orders Found</h3>
                        <p className="text-gray-400 text-lg max-w-md mx-auto">
                            {search 
                                ? "No orders match your search. Try a different Order ID." 
                                : "You haven't placed any orders yet. Start shopping to see your orders here!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;