import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { addToDb, getShoppingCart, removeFromDb, removeOneFromDb } from "../../utils/setLocalStorage";
import { FiDelete } from "react-icons/fi";
import { BsCartXFill } from "react-icons/bs";


const ShoppingSidebar = () => {
    const [data, setData] = useState([])
    console.log(data);
    const navigate = useNavigate()
    const { isOpen, setIsOpen } = useContext(AuthContext)
    const handleAddToCart = (product) => {
        addToDb(product)
    }
    const handleRemoveCart = (item) => {
        console.log(item);
        removeOneFromDb(item)
    }

    const handleDelete = (item) => {
        removeFromDb(item)
    }
    useEffect(() => {
        const fetchData = () => {
            const localData = getShoppingCart();
            setData(localData);
        };
        // Add event listener for "shopping-cart-updated"
        window.addEventListener("shopping-cart-updated", fetchData);

        // Call fetchData initially
        fetchData();

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("shopping-cart-updated", fetchData);
        };
    }, []);
    const totalPrice = data?.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0)
    // console.log(data)
    return (
        <div className={`${isOpen ? 'fixed right-0 top-[55%] transform -translate-y-1/2 z-40' : 'fixed right-[-1000px] top-1/2 transform -translate-y-1/2 z-40'} overflow-hidden h-[80vh] md:h-[78%]  w-full md:w-[30%] transition-right duration-500 bg-white text-black  rounded-md`}>
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center px-8 py-4 border-b  bg-slate-100 ">
                    <p className="text-2xl font-bold bg-slate-">Add to Cart</p>
                    <span onClick={() => setIsOpen(false)} className="text-3xl cursor-pointer font-bold hover:text-red-600"><RxCross2 /></span>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 border-l">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={index} className="flex justify-between mt-8 items-center">
                                <div className="flex items-center gap-3 w-[50%]">
                                    <img className="w-20 h-20" src={item.image} alt="" />
                                    <div className="flex flex-col">
                                        <div>
                                            <p className="text-sm">{item.name}</p>
                                            <p className="text-xs">Tk {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleRemoveCart(item)}
                                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1 rounded-md shadow-lg transition duration-200 ease-in-out text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 text-lg font-medium">{item?.quantity}</span>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded-md shadow-lg transition duration-200 ease-in-out text-xl"
                                    >
                                        +
                                    </button>

                                </div>
                                <span onClick={() => handleDelete(item)} className="text-2xl cursor-pointer">
                                    <RxCross2 />
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-[20%] flex flex-col  items-center ">
                            <p className="text-5xl mb-2 text-gray-300"><BsCartXFill /></p>
                            <p>Cart is empty</p>
                        </div>
                    )}
                </div>
                <div className="bg-gray-200 border-t px-4 pb-2 ">
                    <div className="flex justify-between py-2">
                        <span className="text-xl font-semibold">Subtotal</span>
                        <span className="text-xl font-semibold">Tk {totalPrice}</span>
                    </div>
                    <button onClick={() => {
                        navigate('/checkout')
                        setIsOpen(false);
                    }} className="w-full bg-[#6366F1] font-semibold mt-3 text-white py-3 text-xl rounded">Checkout</button>
                </div>
            </div>
        </div >


    );
};

export default ShoppingSidebar;