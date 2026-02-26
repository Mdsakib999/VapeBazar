import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { addToDb, getShoppingCart, removeFromDb, removeOneFromDb } from "../../utils/setLocalStorage";
import { X, Plus, Minus, Trash2, ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react";

const ShoppingSidebar = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { isOpen, setIsOpen } = useContext(AuthContext);

    const handleAddToCart = (product) => {
        addToDb(product);
    };

    const handleRemoveCart = (item) => {
        removeOneFromDb(item);
    };

    const handleDelete = (item) => {
        removeFromDb(item);
    };

    useEffect(() => {
        const fetchData = () => {
            const localData = getShoppingCart();
            setData(localData);
        };
        window.addEventListener("shopping-cart-updated", fetchData);
        fetchData();
        return () => {
            window.removeEventListener("shopping-cart-updated", fetchData);
        };
    }, []);

    const totalPrice = data?.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0);
    const totalItems = data?.reduce((acc, cur) => acc + cur.quantity, 0);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                                    <ShoppingCart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                                    <p className="text-blue-100 text-sm">
                                       Total {totalItems === 1 ? 'item' : 'items'} {totalItems}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
                        {data && data.length > 0 ? (
                            <div className="space-y-4">
                                {data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                                    >
                                        <div className="p-4">
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        className="w-24 h-24 object-cover rounded-xl border-2 border-gray-100"
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-800 text-sm truncate mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-lg font-bold text-blue-600 mb-3">
                                                        Dhs {item.price}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleRemoveCart(item)}
                                                            disabled={item?.quantity <= 1}
                                                            className={`font-bold w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                                                item?.quantity <= 1
                                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                    : 'bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg text-white hover:scale-110'
                                                            }`}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="bg-gray-100 px-4 py-1.5 rounded-lg font-bold text-gray-800 min-w-[50px] text-center">
                                                            {item?.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleAddToCart(item)}
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg text-white font-bold w-8 h-8 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Item Total and Delete */}
                                                <div className="text-right flex-shrink-0 flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">Total</p>
                                                        <p className="text-lg font-bold text-green-600">
                                                            Dhs {(item.quantity * item.price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                   <div>
                                                     <button
                                                        onClick={() => handleDelete(item)}
                                                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 shadow-md transition-all duration-200 hover:scale-110 mt-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                <div className="bg-gray-100 rounded-full p-8 mb-6">
                                    <ShoppingBag className="w-20 h-20 text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-6">Add items to get started</p>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate('/');
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer - Checkout Section */}
                    {data && data.length > 0 && (
                        <div className="bg-white border-t-2 border-gray-200 px-6 py-4  shadow-2xl">
                            {/* Subtotal */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl px-4 py-2 mb-4 ">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-lg font-semibold text-gray-800">
                                        Dhs {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                              
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => {
                                    navigate('/checkout');
                                    setIsOpen(false);
                                }}
                                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group"
                            >
                                <span className="text-lg">Proceed to Checkout</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>

                            
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShoppingSidebar;