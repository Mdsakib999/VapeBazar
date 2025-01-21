import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const ConfirmCheckout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const orderId = location?.state?.orderId;
    console.log(location);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId);
        alert("Order ID copied to clipboard!");
    };
    return (
        <div className=" inset-0  flex items-center justify-center my-8">
            <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-lg w-11/12 md:w-2/3 lg:w-1/3 p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-green-600 text-center">
                    🎉 Congratulations ✅
                </h2>

                <p className="text-center text-red-600 leading-7">
                    আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। <br /> শীঘ্রই একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবে।
                </p>

                <div className="bg-orange-50 border border-orange-200 rounded-md p-4 text-center">
                    <p className="text-gray-700 font-medium">
                        <span className="font-bold">Order ID:</span> {orderId}
                    </p>
                    <button
                        onClick={handleCopy}
                        className="mt-2 px-5 py-2 text-sm font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none  transition"
                    >
                        Copy Order ID
                    </button>
                </div>

                {!user && (
                    <p className="text-center text-sm text-red-500">
                        ভবিষ্যতে অনুসন্ধানের জন্য অর্ডার আইডি সংরক্ষণ করুন.
                    </p>
                )}

                <Link
                    to={'/product'}
                    className="w-full px-6 py-3 block text-center bg-orange-400 text-white rounded-md font-bold text-lg hover:bg-orange-500 focus:outline-none   transition"

                >
                    Return To Shop
                </Link>

                <div className="text-center">
                    <p className="text-gray-700 text-sm">
                        Need help? Contact us{" "}
                        <a
                            href="tel:+88 01727103079"
                            className=" font-semibold text-orange-500 hover:underline"
                        >
                            +88 01727103079
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCheckout;