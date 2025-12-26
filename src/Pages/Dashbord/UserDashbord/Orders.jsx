import React, { useState } from "react";
// import { formatDate } from './../../../utils/formatDate';
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
    const { axiosNotSecure } = useAxiosNotSecure()
    const [search, setSearch] = useState('')
    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ['order', search],
        queryFn: async () => {
            // const params = {}
            // if (search) params.search = search;
            const res = await axiosNotSecure.get(`/order`, {
                params: { search }
            });
            return res.data;
        },
    });
    // cons
    // Sample order data
    // const orders = data?.data
    // const totalItems = data?.meta?.total
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-2 lg:p-6 bg-gray-50 text-black min-h-screen">
            <h1 className="text-2xl  md:text-3xl text-center font-bold mb-6">Order History</h1>

            {/* Check if there are orders */}
            {orders?.length > 0 ? (
                <div className="space-y-6">
                    {orders?.map((order) => (
                        <div
                            key={order._id}
                            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                        >
                            {/* Order Details */}
                            <div className="flex md:justify-between items-start gap-y-1 md:gap-y-0 md:items-center flex-col md:flex-row mb-4 ">
                                <div>
                                    <h2 className="font-semibold md:text-lg">Order ID: {order.orderId}</h2>
                                    {/* <p className="text-gray-600">Date: {formatDate(order.createdAt)}</p> */}
                                </div>
                                <p
                                    className={`font-semibold text-sm px-3 py-1 rounded-full ${order.orderStatus === "Delivered"
                                        ? "bg-green-100 text-green-600"
                                        : order.orderStatus === "Shipped"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {order.orderStatus}
                                </p>
                            </div>

                            {/* Items List */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
                                <ul className="space-y-2">
                                    {order?.product?.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item?.productId?.image}
                                                    alt={item.productId.name}
                                                    className="w-12 h-12 rounded object-cover"
                                                />
                                                <span>
                                                    {item.productId.name} (x {item.quantity}) <span className="text-red-500">{item.nicotineStrength}</span>
                                                </span>
                                            </div>
                                            <span>Dhs {item.productId.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4 flex justify-between">
                                <span className="font-semibold text-gray-800">Products Price:</span>
                                <span className="font-semibold text-gray-800">Dhs {order.totalAmount}</span>
                            </div>
                            <div className=" border-gray-200 pt-1 flex justify-between">
                                <span className="font-semibold text-gray-800">Shipping Fee:</span>
                                <span className="font-semibold text-gray-800">Dhs {order.shippingFee}</span>
                            </div>
                            {
                                order.discount && <div className=" border-gray-200 pt-1 flex justify-between">
                                    <span className="font-semibold text-gray-800">Discount</span>
                                    <span className="font-semibold text-gray-800">-Dhs {order.discount}</span>
                                </div>
                            }
                            <div className="border-t border-gray-200 pt-2  flex justify-between">
                                <span className="font-semibold text-gray-800 ">Total:</span>
                                <span className="font-semibold text-gray-800">Dhs {order?.discount ? (Number(order?.totalAmount) + Number(order?.shippingFee)) - Number(order?.discount) : (Number(order?.totalAmount) + Number(order?.shippingFee))}</span>
                            </div>
                        </div>
                    ))}


                    {/* <div className="flex justify-center items-center mt-6 space-x-2">
                        {Array.from({ length: Math.ceil(totalItems / limit) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                    } hover:bg-blue-400`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div> */}
                </div>
            ) : (
                <p className="text-gray-600">You have no order history yet.</p>
            )}
        </div>
    );
};

export default Orders;
