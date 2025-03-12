import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { TfiReload } from "react-icons/tfi";
import LoadingComponent from "../../../components/LoadingComponent";

const ManageOrders = () => {
    const { axiosNotSecure } = useAxiosNotSecure()
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('')
    const { data: orders = [], refetch, isLoading: orderLoading } = useQuery({
        queryKey: ['orders', status, search], // Unique query key
        queryFn: async () => {
            // Set optional query parameters dynamically
            const params = {};

            // Add conditions for query params based on your component's state/props
            if (status) params.status = status; // e.g., "Pending"
            if (search) params.search = search; // e.g., "017"

            // Fetch orders with optional query parameters
            const res = await axiosNotSecure.get(`/orders`, { params });
            return res.data; // Return the data
        },
        enabled: true, // Optionally control whether to run the query immediately
    });


    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const closeModal = () => {
        setSelectedOrder(null);
        setUpdatedStatus("");
    };
    const handleUpdateStatus = async () => {
        const status = updatedStatus;
        const data = { orderStatus: status };
        const res = await axiosNotSecure.patch(`/order/${selectedOrder._id}`, data);
        // const res = await updateOrder(data);

        if (res) {
            closeModal();
            refetch()
        }
    };

    const handleDeleteOrder = async (id) => {
        const isDelete = confirm('Do You Want to Delete Order')
        if (isDelete) {
            const res = await axiosNotSecure.delete(`/order/${id}`);
            if (res.data) {
                refetch()
            }
        }

    };
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await refetch();  // Wait for refetch to complete
        setIsLoading(false);
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold text-center text-black mb-6">Manage Orders</h1>
            <div className="flex items-center justify-between px-4 ">
                <div className="w-full max-w-xs">
                    <label
                        htmlFor="options"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Select an option
                    </label>
                    <select
                        id="options"
                        // value={selectedOption}
                        // onChange={handleChange}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 text-sm border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="">
                            Show All Orders
                        </option>
                        <option value="pending">Pending Orders</option>
                        <option value="Shipped">Shipped Orders</option>
                        <option value="Delivered">Delivered Orders</option>
                        <option value="Cancel">Cancel Orders</option>
                    </select>

                </div>
                <div onClick={handleClick} className="cursor-pointer">
                    <TfiReload
                        className={`text-black size-4 transition-transform ${isLoading ? "animate-spin" : ""
                            }`}
                    />
                </div>
                <div className="relative md:flex text-black  items-center group  pt-1">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="border border-gray-300 group-hover:border-orange-500 rounded-full py-2 px-4 pl-10 md:max-w-[320px] focus:outline-none focus:border-orange-400"
                    />
                    <FiSearch
                        className="absolute left-3 top-4 group-hover:text-orange-500"
                        size={22}
                    />
                </div>
            </div>

            {/* Table data */}
            <div className="p-4">
                <div className="overflow-x-auto">
                    {orderLoading ? (
                        <div className="w-full flex justify-center py-5">
                            <LoadingComponent />
                        </div>
                    ) : (
                        <table className="w-full border-collapse text-black">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 border min-w-[100px]">Order ID</th>
                                    <th className="p-2 border min-w-[150px]">Email</th>
                                    <th className="p-2 border min-w-[130px]">Contact No</th>
                                    <th className="p-2 border min-w-[120px]">Total Amount</th>
                                    <th className="p-2 border min-w-[100px]">Status</th>
                                    <th className="p-2 border min-w-[150px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order._id} className="text-center border-b">
                                        <td className="p-2 border">{order.orderId}</td>
                                        <td className="p-2 border">
                                            {order?.userData?.email ? order.userData.email : "Guest"}
                                        </td>
                                        <td className="p-2 border">
                                            {order?.userId?.contactNo ? order.userId.contactNo : order?.contactNo}
                                        </td>
                                        <td className="p-2 border">
                                            {order?.discount
                                                ? Number(order.totalAmount) + Number(order.shippingFee) - Number(order.discount)
                                                : Number(order.totalAmount) + Number(order.shippingFee)}
                                        </td>
                                        <td className="p-2 border">
                                            <span
                                                className={`px-2 py-1 rounded-lg font-semibold 
                                        ${order?.orderStatus === "Pending"
                                                        ? "text-red-500"
                                                        : order?.orderStatus === "Shipped"
                                                            ? "text-blue-500"
                                                            : order?.orderStatus === "Cancel"
                                                                ? "text-gray-600"
                                                                : "text-green-500"
                                                    }`}
                                            >
                                                {order?.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-2 border">
                                            <div className="flex justify-center gap-3">
                                                {/* View Details Button */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setUpdatedStatus(order?.orderStatus);
                                                    }}
                                                    className="bg-orange-500 text-white px-4 py-2 rounded-md shadow hover:bg-orange-600 transition focus:outline-none"
                                                >
                                                    Details
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* <div className="flex justify-center items-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(totalItems / limit) }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200"
                                } hover:bg-orange-400`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div> */}
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full max-h-[95vh] overflow-auto">
                        <h2 className="text-xl font-semibold mb-2">
                            Order Details - {selectedOrder.orderId}
                        </h2>
                        <p className="text-red-500 mb-2">
                            {selectedOrder.isCouponUse && "Coupon Used"}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedOrder.userData?.email
                                ? selectedOrder.userData?.email
                                : "Guest"}
                        </p>
                        <p className=" py-1">
                            <strong>User Name:</strong>{" "}
                            {selectedOrder?.userId?.userName
                                ? selectedOrder?.userId?.userName
                                : selectedOrder?.userLocation?.userName}
                        </p>
                        <p>
                            <strong>Contact No:</strong>{" "}
                            {selectedOrder?.userId?.contactNo
                                ? selectedOrder?.userId?.contactNo
                                : selectedOrder?.contactNo}
                        </p>
                        <p className=" py-1">
                            <strong>Address:</strong>{" "}
                            {selectedOrder?.userId?.location
                                ? selectedOrder?.userId?.location
                                : selectedOrder?.userLocation?.location}
                        </p>
                        <p className=" py-1">
                            <strong>Date: </strong>
                            {selectedOrder?.createdAt &&
                                new Date(selectedOrder.createdAt).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                        </p>
                        <p className="mb-2">
                            <strong>Current Status:</strong>{" "}
                            <span
                                className={`px-2 py- rounded-lg font-semibold ${selectedOrder?.orderStatus === "Pending"
                                    ? "text-red-500"
                                    : selectedOrder?.orderStatus === "Shipped"
                                        ? "text-blue-500"
                                        : selectedOrder?.orderStatus === "Cancel"
                                            ? "text-gray-600"
                                            : "text-green-500"
                                    }`}
                            >
                                {selectedOrder.orderStatus}
                            </span>
                        </p>
                        <ul className="list-none space-y-3 ">
                            {selectedOrder?.product?.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center space-x-4 border-b pb-1"
                                >
                                    <img
                                        src={item.productId?.images[0]}
                                        alt={item?.productId?.productName}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="flex justify-center">{item?.productId?.name} <p className="text-red-500"> {`${item.nicotineStrength}`}</p> </p>
                                        <p>
                                            {Number(item.quantity)} x Dhs{" "}
                                            {Number(item?.productId?.price)} ={" "}
                                            {(
                                                Number(item.quantity) *
                                                Number(item?.productId?.price)
                                            ).toFixed(2)}{" "}
                                            Dhs
                                        </p>
                                    </div>
                                </li>
                            ))}
                            <p className="flex flex-col" >
                                <p className="flex justify-between"><strong>Subtotal:</strong> Dhs {selectedOrder?.totalAmount}</p>
                                <p className="flex justify-between"><strong>Shipping Fee:</strong> Dhs {selectedOrder?.shippingFee}</p>
                                {
                                    selectedOrder?.discount && <p className="flex justify-between"><strong>Discount:</strong> -Dhs {selectedOrder?.discount}</p>
                                }


                                <p className="flex justify-between border-t mt-1"><strong>Total Amount:</strong> Dhs {selectedOrder?.discount ? (Number(selectedOrder?.totalAmount) + Number(selectedOrder?.shippingFee)) - Number(selectedOrder?.discount) : (Number(selectedOrder?.totalAmount) + Number(selectedOrder?.shippingFee))}</p>
                            </p>
                        </ul>

                        {/* Status Update */}
                        <div className="mt-4 ">
                            <label className="block text-gray-700 font-medium mb-2">
                                Update Status
                            </label>
                            <div className="flex gap-x-3">
                                <select
                                    value={updatedStatus}
                                    required
                                    onChange={(e) => setUpdatedStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                                >
                                    <option value="">Select a status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancel">Cancel</option>
                                </select>

                                <button
                                    onClick={handleUpdateStatus}
                                    className="bg-orange-500 text-white px-4 font-semibold py-2 rounded hover:bg-orange-600 fou"
                                >
                                    Update
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white border-2 border-red-500 px-4 py-2 rounded hover:bg-red-600  hover:border-red-600 font-semibold focus:outline-none"
                            >
                                Close
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
