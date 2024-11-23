import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { addToDb, getLocalData, removeFromDb, removeOneFromDb } from "../../utils/setLocalStorage";
import { FiDelete } from "react-icons/fi";


const ShoppingSidebar = () => {
    const [data, setData] = useState([])
    console.log(data);
    const navigate = useNavigate()
    const { isOpen, setIsOpen } = useContext(AuthContext)
    const handleAddToCart = (product) => {
        console.log(product);
        addToDb(product?.id)
    }
    const handleRemoveCart = (item) => {
        removeOneFromDb(item.id)
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are You Sure For Remove?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Product Remove",
                    text: "Product Remove From Cart Successfully.",
                    showConfirmButton: false,
                    icon: "success",
                    timer: 2000
                });
                removeFromDb(item.id)
            }
        });

    }
    useEffect(() => {
        const fetchData = async () => {
            const localData = await getLocalData();
            setData(localData);
        };
        fetchData();
    }, []);
    const totalPrice = data?.reduce((acc, cur) => acc + (cur.quantity * cur.price), 0)
    // console.log(data)
    return (
        <div className={`${isOpen ? 'fixed right-0 top-[55%] transform -translate-y-1/2 z-40' : 'fixed right-[-1000px] top-1/2 transform -translate-y-1/2 z-40'} overflow-hidden h-[90vh] md:h-[85%]  w-full md:w-[30%] transition-right duration-500 bg-white text-black  rounded-md`}>
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-8 border-b  bg-slate-100">
                    <p className="text-3xl font-bold bg-slate-">Shopping Cart</p>
                    <span onClick={() => setIsOpen(false)} className="text-3xl cursor-pointer font-bold"><RxCross2 /></span>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 border-l">
                    {
                        data?.map((item, index) => (

                            <div key={index} className="flex justify-between mt-8  items-center ">
                                <div className="flex items-center gap-3  w-[50%]">

                                    <span onClick={() => handleDelete(item)} className="text-2xl cursor-pointer"><FiDelete /></span>
                                    <div className="flex flex-col">
                                        <div>
                                            <p>{item.name}</p>
                                            {/* <p>{item.quantity}</p> */}
                                            <p>Tk {item.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button onClick={() => handleRemoveCart(item)} className="btn text-xl">-</button>
                                    <span className="px-4">{item?.quantity}</span>
                                    <button onClick={() => handleAddToCart(item)} className="btn text-xl">+</button>
                                </div>

                                <img className="w-20 h-20" src={item.image} alt="" />
                            </div>
                        ))
                    }
                </div>
                <div className="bg-gray-200 border-t p-4">
                    <div className="flex justify-between py-2">
                        <span className="text-xl font-semibold">Subtotal</span>
                        <span className="text-xl font-semibold">Tk {totalPrice}</span>
                    </div>
                    <button onClick={() => {
                        setIsOpen(false);
                        navigate('checkout');
                    }} className="w-full bg-orange-400 font-semibold mt-3 text-white py-3 text-xl">Confirm Order</button>
                </div>
            </div>
        </div >


    );
};

export default ShoppingSidebar;