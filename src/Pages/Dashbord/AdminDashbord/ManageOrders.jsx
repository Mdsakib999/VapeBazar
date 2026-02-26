import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { TfiReload } from "react-icons/tfi";
import LoadingComponent from "../../../components/LoadingComponent";
import { 
    ShoppingCart, 
    Package, 
    Trash2, 
    Eye, 
    X, 
    AlertTriangle,
    Filter,
    Calendar,
    Mail,
    Phone,
    MapPin,
    User,
    CreditCard,
    Truck
} from "lucide-react";

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, orderId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-700 text-base mb-2">
                        Are you sure you want to delete this order?
                    </p>
                    {orderId && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mt-4">
                            <p className="text-sm text-gray-600 mb-1">Order ID:</p>
                            <p className="font-semibold text-gray-800">{orderId}</p>
                        </div>
                    )}
                    <p className="text-sm text-gray-500 mt-4">
                        This action cannot be undone. The order will be permanently removed.
                    </p>
                </div>

                <div className="px-6 pb-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Delete Order
                    </button>
                </div>
            </div>
        </div>
    );
};

const ManageOrders = () => {
    const { axiosNotSecure } = useAxiosNotSecure();
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    
    const { data: orders = [], refetch, isLoading: orderLoading } = useQuery({
        queryKey: ['orders', status, search],
        queryFn: async () => {
            const params = {};
            if (status) params.status = status;
            if (search) params.search = search;
            const res = await axiosNotSecure.get(`/orders`, { params });
            return res.data;
        },
        enabled: true,
    });

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setSelectedOrder(null);
        setUpdatedStatus("");
    };

    const handleUpdateStatus = async () => {
        const status = updatedStatus;
        const data = { orderStatus: status };
        const res = await axiosNotSecure.patch(`/order/${selectedOrder._id}`, data);
        if (res) {
            closeModal();
            refetch();
        }
    };

    const openDeleteModal = (order) => {
        setOrderToDelete(order);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setOrderToDelete(null);
    };

    const confirmDelete = async () => {
        if (orderToDelete) {
            const res = await axiosNotSecure.delete(`/order/${orderToDelete._id}`);
            if (res.data) {
                refetch();
                closeDeleteModal();
            }
        }
    };

    const handleClick = async () => {
        setIsLoading(true);
        await refetch();
        setIsLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "Shipped":
                return "bg-blue-100 text-blue-700 border-blue-300";
            case "Delivered":
                return "bg-green-100 text-green-700 border-green-300";
            case "Cancel":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                  
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 pb-2">
                        Manage Orders
                    </h1>
                    <p className="text-gray-600">Track and manage all customer orders</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Status Filter */}
                        <div className="w-full md:w-64">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Filter className="w-4 h-4 text-blue-600" />
                                Filter by Status
                            </label>
                            <select
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-700"
                            >
                                <option value="">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancel">Cancelled</option>
                            </select>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-lg text-white p-3 rounded-xl transition-all duration-300 hover:scale-110"
                        >
                            <TfiReload className={`w-5 h-5 transition-transform ${isLoading ? "animate-spin" : ""}`} />
                        </button>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by Order ID..."
                                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        {orderLoading ? (
                            <div className="w-full flex justify-center py-20">
                                <LoadingComponent />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-20">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No orders found</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 text-black">
                                    <tr>
                                        <th className="p-4 text-left font-semibold min-w-[120px]">Order ID</th>
                                        <th className="p-4 text-left font-semibold min-w-[180px]">Customer</th>
                                        <th className="p-4 text-left font-semibold min-w-[140px]">Contact</th>
                                        <th className="p-4 text-left font-semibold min-w-[120px]">Amount</th>
                                        <th className="p-4 text-left font-semibold min-w-[120px]">Status</th>
                                        <th className="p-4 text-center font-semibold min-w-[180px]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {orders?.map((order, index) => (
                                        <tr 
                                            key={order._id} 
                                            className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${
                                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            }`}
                                        >
                                            <td className="p-4 font-semibold text-blue-600">#{order.orderId}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <span className="truncate max-w-[150px]">
                                                        {order?.userData?.email || "Guest"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    {order?.userId?.contactNo || order?.contactNo}
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-green-600">
                                                Dhs {order?.discount
                                                    ? Number(order.totalAmount) + Number(order.shippingFee) - Number(order.discount)
                                                    : Number(order.totalAmount) + Number(order.shippingFee)}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${getStatusColor(order?.orderStatus)}`}>
                                                    {order?.orderStatus}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order);
                                                            setUpdatedStatus(order?.orderStatus);
                                                        }}
                                                        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Details</span>
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(order)}
                                                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        <span className="hidden sm:inline">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                orderId={orderToDelete?.orderId}
            />

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden animate-fadeIn">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-pink-500  to-purple-600 px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Order Details</h2>
                                    <p className="text-blue-100 text-sm">#{selectedOrder.orderId}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            {/* Customer Info */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Customer Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-semibold text-gray-800">{selectedOrder.userData?.email || "Guest"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="font-semibold text-gray-800">
                                                {selectedOrder?.userId?.userName || selectedOrder?.userLocation?.userName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Contact</p>
                                            <p className="font-semibold text-gray-800">
                                                {selectedOrder?.userId?.contactNo || selectedOrder?.contactNo}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Address</p>
                                            <p className="font-semibold text-gray-800">
                                                {selectedOrder?.userId?.location || selectedOrder?.userLocation?.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Order Date</p>
                                            <p className="font-semibold text-gray-800">
                                                {selectedOrder?.createdAt &&
                                                    new Date(selectedOrder.createdAt).toLocaleString("en-US", {
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Status</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(selectedOrder?.orderStatus)}`}>
                                                {selectedOrder.orderStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {selectedOrder.isCouponUse && (
                                    <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-3 rounded">
                                        <p className="text-red-700 font-semibold text-sm">Coupon Applied</p>
                                    </div>
                                )}
                            </div>

                            {/* Products */}
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    Order Items
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder?.product?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200"
                                        >
                                            <img
                                                src={item.productId?.images[0]}
                                                alt={item?.productId?.name}
                                                className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{item?.productId?.name}</p>
                                                {item.nicotineStrength && (
                                                    <p className="text-sm text-red-600">Nicotine: {item.nicotineStrength}</p>
                                                )}
                                                {item.flavour && (
                                                    <p className="text-sm text-blue-600">Flavour: {item.flavour}</p>
                                                )}
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {item.quantity} × Dhs {item?.productId?.price} = 
                                                    <span className="font-bold text-green-600 ml-1">
                                                        Dhs {(Number(item.quantity) * Number(item?.productId?.price)).toFixed(2)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100 mb-6">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                    Payment Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal:</span>
                                        <span className="font-semibold">Dhs {selectedOrder?.totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Shipping Fee:</span>
                                        <span className="font-semibold">Dhs {selectedOrder?.shippingFee}</span>
                                    </div>
                                    {selectedOrder?.discount && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount:</span>
                                            <span className="font-semibold">-Dhs {selectedOrder?.discount}</span>
                                        </div>
                                    )}
                                    <div className="pt-3 border-t-2 border-green-200 flex justify-between text-lg">
                                        <span className="font-bold text-gray-800">Total Amount:</span>
                                        <span className="font-black text-green-600">
                                            Dhs {selectedOrder?.discount 
                                                ? (Number(selectedOrder?.totalAmount) + Number(selectedOrder?.shippingFee)) - Number(selectedOrder?.discount) 
                                                : (Number(selectedOrder?.totalAmount) + Number(selectedOrder?.shippingFee))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Update */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-100">
                                <label className="block font-bold text-gray-800 mb-3">
                                    Update Order Status
                                </label>
                                <div className="flex gap-3">
                                    <select
                                        value={updatedStatus}
                                        onChange={(e) => setUpdatedStatus(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-200"
                                    >
                                        <option value="">Select status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
                                    <button
                                        onClick={handleUpdateStatus}
                                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 pb-6">
                            <button
                                onClick={closeModal}
                                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-200"
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