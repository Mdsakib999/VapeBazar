import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../Provider/AuthProvider';
import { deleteDB, getShoppingCart } from './../../utils/setLocalStorage';
import axios from "axios";
import { Toaster, toast } from 'sonner'
import useGetMe from "../../Hooks/useGetMe";
const Checkout = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const { user } = useContext(AuthContext);
    const [couponDisCountTk, setCouponDisCountTk] = useState("");
    const [couponText, setCouponText] = useState("");
    const { meData, isFetched } = useGetMe()
    const userData = meData
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState({
        location: "",
        contactNo: "",
        userName: "",
        postCode: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");

    useEffect(() => {
        if (userData) {
            setUserLocation({
                location: userData.location,
                contactNo: userData?.contactNo,
                userName: userData?.userName,
                postCode: userData?.postCode,
            });
        } else {
            setUserLocation({
                location: "",
                contactNo: "",
                userName: "",
                postCode: ''
            });
        }
    }, [isFetched, user]);

    const shippingFee = 100;

    const totalAmount =
        products.reduce(
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
            // Optionally, set a loading state here
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/validCoupon`, { couponText });
            if (res?.data) {
                toast.success("Coupon applied successfully!");
                setCouponDisCountTk(res.data.discount); // Update the discount state
            }

        } catch (error) {
            console.error("Error applying coupon:", error);
            toast.error(error?.response?.data?.message || "Failed to apply coupon. Please try again.");
        }
    };


    const handlePayment = async () => {
        try {
            if (!userLocation.location || userLocation.location.trim().length === 0) {
                return toast.error("Please set your location.");
            }

            if (!userLocation.contactNo || userLocation.contactNo.trim().length === 0) {
                return toast.error("Please set your contact number.");
            }
            if (!userLocation.postCode || userLocation.postCode.trim().length === 0) {
                return toast.error("Please set your Post Code");
            }


            const product = products.map((item) => ({
                productId: item.productId,
                nicotineStrength: item.nicotineStrength,
                quantity: item.quantity.toString(),
            }));

            const userId = user ? userData?._id : null;
            const contactNo = userLocation.contactNo
            // userLocation.location = `${userLocation.location}, ${userLocation.district}`
            delete userLocation.contactNo
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
        : totalAmount) + shippingFee
    // console.log(totalAmount || 0);
    // console.log(couponDisCountTk);
    // ei khan teke
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };




    return (
        <div className="min-h-screen bg-gray-100 p-6 text-black pb-20">
            <Toaster />
            <p className="text-3xl font-bold text-center mb-8"> Checkout Page</p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - User Interface */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-xl text-center text-primaryColor font-semibold mb-4">
                            User Information
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    User Name
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
                                    className="w-full p-3 bg-gray-50 rounded-md border focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Contact Number
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
                                    className="w-full p-3 bg-gray-50 rounded-md border focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Enter your contact number"
                                />
                            </div>
                            {/* <div>
                                <label className="block font-medium text-gray-700 mb-1">District</label>
                                <select
                                    className="w-full mt-2 p-3 bg-gray-50 rounded-md border outline-none"
                                    value={userLocation.district}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            district: e.target.value,
                                        })
                                    }
                                >
                                    <option value={userLocation.district} >
                                        {userLocation.district}
                                    </option>
                                    {districtData?.data?.map((item, index) => (
                                        <option key={index} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={userLocation.location}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-50 rounded-md border focus:outline-none focus:ring-1  focus:ring-orange-500"
                                    placeholder="Enter Your Delivery location"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Post Code
                                </label>
                                <input
                                    type="text"
                                    value={userLocation.postCode}
                                    required
                                    onChange={(e) =>
                                        setUserLocation({
                                            ...userLocation,
                                            postCode: e.target.value,
                                        })
                                    }
                                    className="w-full p-3 bg-gray-50 rounded-md border focus:outline-none focus:ring-1  focus:ring-orange-500"
                                    placeholder="Enter Your Delivery location Post Code"
                                />
                            </div>

                            {/* <div>
                                <label className="flex items-center space-x-2 mt-6">
                                    <span className="text-gray-700 font-medium">Delivery</span>
                                </label>
                                <div className="flex items-center space-x-8 mt-3">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="deliveryLocation"
                                            value="inside"
                                            className="radio"
                                            checked={userLocation?.isInChittagong}
                                            onChange={() =>
                                                setUserLocation({
                                                    ...userLocation,
                                                    isInChittagong: true,
                                                })
                                            }
                                        />
                                        <span>Inside Chittagong</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="deliveryLocation"
                                            value="outside"
                                            className="radio"
                                            checked={!userLocation?.isInChittagong}
                                            onChange={() =>
                                                setUserLocation({
                                                    ...userLocation,
                                                    isInChittagong: false,
                                                })
                                            }
                                        />
                                        <span>Outside Chittagong</span>
                                    </label>
                                </div>
                            </div> */}

                            <div className="flex flex-col items-start pt-3  gap-4 ">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 accent-orange-600"
                                    />
                                    <span className="text-gray-600">
                                        Are you agree with the terms and conditions?
                                    </span>
                                </label>

                            </div>

                            {/* <div>
                <label className="flex items-center space-x-2">
                  <span className="text-gray-700">Delivery</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={userLocation?.isInChittagong}
                    onChange={(e) =>
                      setUserLocation({
                        ...userLocation,
                        isInChittagong: e.target.checked,
                      })
                    }
                  />
                </label>
              </div> */}

                        </div>
                    </div>
                </div>

                {/* Right Side - Product & Payment Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl text-center text-primaryColor font-semibold mb-4">
                        Order Summary
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">Products</h3>
                            <div className="divide-y">
                                {products.map((product) => (
                                    <div
                                        key={product.productId}
                                        className="flex justify-between py-2"
                                    >
                                        <img src={product.image} className="h-20" alt="" />
                                        <div>
                                            <p className="md:text-xl  pr-3 sm:pr-0">{product.name}</p>
                                            <p className="text-sm text-gray-800 ml-3">
                                                {product.quantity} x {product.price} Dhs
                                            </p>
                                        </div>
                                        <p>Tk {product.price * product.quantity} Dhs</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Payment Method</h3>
                            <select
                                className="w-full mt-2 p-3 bg-gray-50 rounded-md border  outline-none"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="cash-on-delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        {/* Coupon Field */}
                        <div>
                            <h3 className="text-lg font-medium">Coupon Code</h3>
                            <div className="flex space-x-2 mt-2">
                                <input
                                    type="text"
                                    value={couponText}
                                    onChange={(e) => setCouponText(e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-md border focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    placeholder="Enter coupon code"
                                />
                                <button
                                    disabled={!couponText}
                                    className={` ${!couponText
                                        ? "bg-backgroundColor opacity-70"
                                        : "bg-primaryColor"
                                        } text-white py-2 px-4 rounded-md  transition`}
                                    onClick={applyCoupon}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className=" pt-4">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>
                                    {products.reduce(
                                        (total, product) =>
                                            total + product.price * product.quantity,
                                        0
                                    )}{" "}
                                    Dhs
                                </p>
                            </div>
                            <div className="flex justify-between ">
                                <p>Shipping Fee</p>
                                <p>{shippingFee} Dhs</p>
                            </div>
                            {couponDisCountTk && (
                                <div className="flex justify-between  ">
                                    <p>Coupon Discount </p>
                                    <p>- {couponDisCountTk} Dhs</p>
                                </div>
                            )}
                            <div className="flex text-lg mt-1 justify-between font-semibold border-t">
                                <p>Total</p>
                                <p>{discountedTotalAmount} Dhs</p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                disabled={products.length === 0}
                                onClick={handlePayment}
                                className="w-full py-3 bg-primaryColor text-white rounded-md  font-semibold transition"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
