import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import { 
    CheckCircle2, 
    Copy, 
    ShoppingBag, 
    Phone, 
    MessageCircle,
    Package,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const ConfirmCheckout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const orderId = location?.state?.orderId;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId);
        toast.success("Order ID copied to clipboard!");
    };

    const handleWhatsApp = () => {
        window.open(`https://wa.me/971524869090?text=Hi, I need help with my order ${orderId}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-24 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
                {/* Success Header with Animation */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 px-8 py-10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                        className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl mb-4"
                    >
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-4xl md:text-5xl font-black text-white mb-2 relative z-10"
                    >
                        Order Confirmed!
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="text-green-100 text-lg relative z-10"
                    >
                        🎉 Thank you for your purchase
                    </motion.p>
                </motion.div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-6">
                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2 text-lg">
                                    Your order has been successfully placed!
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Our team will contact you shortly to confirm your delivery details. 
                                    You will receive updates about your order status.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Order ID Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200"
                    >
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Your Order ID</p>
                            <div className="bg-white rounded-xl p-4 mb-4 border-2 border-orange-200">
                                <p className="text-2xl md:text-3xl font-black text-gray-800 tracking-wide">
                                    {orderId}
                                </p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <Copy className="w-5 h-5" />
                                Copy Order ID
                            </button>
                        </div>
                    </motion.div>

                    {/* Guest User Warning */}
                    {!user && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-5 border-2 border-red-200"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">
                                    <span className="font-bold">Important:</span> Please save your Order ID for future reference and tracking.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        className="space-y-3"
                    >
                        <Link
                            to={'/product'}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            Continue Shopping
                        </Link>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200"
                    >
                        <h3 className="font-bold text-gray-800 text-center mb-4 text-lg">
                            Need Help?
                        </h3>
                        <p className="text-center text-gray-600 mb-4 text-sm">
                            Our support team is here to assist you
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="tel:+971524869090"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                <span className="text-sm">Call Us</span>
                            </a>
                            <button
                                onClick={handleWhatsApp}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm">WhatsApp</span>
                            </button>
                        </div>
                        <p className="text-center text-gray-600 mt-3 text-sm">
                            <a href="tel:+971524869090" className="font-bold text-blue-600 hover:underline">
                                +971 52 486 9090
                            </a>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ConfirmCheckout;