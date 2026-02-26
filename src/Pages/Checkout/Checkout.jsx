import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../Provider/AuthProvider';
import { deleteDB, getShoppingCart } from './../../utils/setLocalStorage';
import axios from "axios";
import { Toaster, toast } from 'sonner';
import useGetMe from "../../Hooks/useGetMe";
import { motion } from "framer-motion";
import { 
    ShoppingBag, 
    User, 
    Phone, 
    MapPin, 
    CreditCard, 
    Tag, 
    CheckCircle2,
    AlertCircle,
    Truck,
    Package
} from "lucide-react";

const Checkout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const { user } = useContext(AuthContext);
    const [couponDisCountTk, setCouponDisCountTk] = useState("");
    const [couponText, setCouponText] = useState("");
    const { meData, isFetched } = useGetMe();
    const userData = meData;
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState({
        location: "",
        contactNo: "",
        userName: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
    const [isChecked, setIsChecked] = useState(false);
    const [termsError, setTermsError] = useState(false);

    useEffect(() => {
        if (userData) {
            setUserLocation({
                location: userData.location,
                contactNo: userData?.contactNo,
                userName: userData?.userName,
            });
        } else {
            setUserLocation({
                location: "",
                contactNo: "",
                userName: ""
            });
        }
    }, [isFetched, user]);

    const shippingFee = 100;

    const totalAmount = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    useEffect(() => {
        const fetchData = () => {
            const localData = getShoppingCart();
            setProducts(localData);
        };
        window.addEventListener("shopping-cart-updated", fetchData);
        fetchData();
        return () => {
            window.removeEventListener("shopping-cart-updated", fetchData);
        };
    }, []);

    const applyCoupon = async () => {
        if (Number(totalAmount) < 1000) {
            return toast.error("Must minimum product price 1000");
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/validCoupon`, { couponText });
            if (res?.data) {
                toast.success("Coupon applied successfully!");
                setCouponDisCountTk(res.data.discount);
            }
        } catch (error) {
            console.error("Error applying coupon:", error);
            toast.error(error?.response?.data?.message || "Failed to apply coupon. Please try again.");
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setTermsError(false);
        }
    };

    const handlePayment = async () => {
        try {
            if (!isChecked) {
                setTermsError(true);
                toast.error("Please agree to the terms and conditions");
                return;
            }

            if (!userLocation.location || userLocation.location.trim().length === 0) {
                return toast.error("Please set your location.");
            }

            if (!userLocation.contactNo || userLocation.contactNo.trim().length === 0) {
                return toast.error("Please set your contact number.");
            }

            const product = products.map((item) => ({
                productId: item.productId,
                nicotineStrength: item?.nicotineStrength || '',
                flavour: item?.flavour || '',
                quantity: item.quantity.toString(),
            }));

            const userId = user ? userData?._id : null;
            const contactNo = userLocation.contactNo;
            delete userLocation.contactNo;
            
            const orderData = {
                product,
                contactNo,
                userLocation,
                shippingFee: String(shippingFee),
                totalAmount: totalAmount.toString(),
                ...(userId && { userId }),
                ...(couponDisCountTk && { discount: couponDisCountTk }),
            };
            
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/order`, orderData);
            if (res?.data) {
                setCouponDisCountTk("");
                deleteDB();
                navigate("/confirm-checkout", { state: res?.data });
                toast.success("Order placed successfully!");
            } else {
                toast.error(res.error.data.message);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const discountedTotalAmount = (couponDisCountTk
        ? Number(totalAmount || 0) - Number(couponDisCountTk)
        : totalAmount) + shippingFee;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-24 pb-10 px-4">
            <Toaster position="top-center" />
            
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
            >
                
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Checkout
                </h1>
                <p className="text-gray-600">Complete your order</p>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Side - User Information */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <User className="w-6 h-6 text-blue-600" />
                            User Information
                        </h2>

                        <div className="space-y-5">
                            {/* User Name */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border-2 border-purple-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <User className="w-4 h-4 text-purple-600" />
                                    Full Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userLocation.userName}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            userName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-blue-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    Contact Number
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userLocation.contactNo}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            contactNo: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter your contact number"
                                />
                            </div>

                            {/* Address */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border-2 border-green-100">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                    Delivery Address
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={userLocation.location}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            location: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-200 resize-none"
                                    placeholder="Enter your complete delivery address"
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <div className={`bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-2xl border-2 ${
                                termsError ? 'border-red-500' : 'border-orange-100'
                            }`}>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className="w-5 h-5 mt-0.5 accent-blue-600 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                        I agree to the <span className="font-semibold text-blue-600">terms and conditions</span> and understand the delivery policies
                                    </span>
                                </label>
                                {termsError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 flex items-center gap-2 text-red-600 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        <span>You must agree to the terms and conditions to proceed</span>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side - Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Package className="w-6 h-6 text-blue-600" />
                            Order Summary
                        </h2>

                        {/* Products */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Products</h3>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.productId}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-200"
                                    >
                                        <img 
                                            src={product.image} 
                                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-white shadow-md" 
                                            alt={product.name} 
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 text-sm md:text-base truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-xs md:text-sm text-gray-600">
                                                {product.quantity} × Dhs {product.price}
                                            </p>
                                        </div>
                                        <p className="font-bold text-green-600 text-sm md:text-base">
                                            Dhs {product.price * product.quantity}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                                Payment Method
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cash-on-delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        {/* Coupon Code */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                <Tag className="w-4 h-4 text-blue-600" />
                                Coupon Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponText}
                                    onChange={(e) => setCouponText(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter coupon code"
                                />
                                <button
                                    disabled={!couponText}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                        !couponText
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:shadow-lg hover:scale-105"
                                    }`}
                                    onClick={applyCoupon}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100 mb-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">Dhs {totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Shipping Fee
                                    </span>
                                    <span className="font-semibold">Dhs {shippingFee}</span>
                                </div>
                                {couponDisCountTk && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount</span>
                                        <span className="font-semibold">- Dhs {couponDisCountTk}</span>
                                    </div>
                                )}
                                <div className="pt-3 border-t-2 border-green-200 flex justify-between text-lg">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="font-black text-green-600">
                                        Dhs {discountedTotalAmount}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Order Button */}
                        <button
                            disabled={products.length === 0}
                            onClick={handlePayment}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                products.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                            }`}
                        >
                            <CheckCircle2 className="w-6 h-6" />
                            Confirm Order
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;