import React, { useState, useEffect } from "react";
import useAxiosNotSecure from "../../Hooks/useAxiosNotSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    GlassMagnifier,
    Magnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import { Toaster, toast } from "sonner";
import { addToDb } from "../../utils/setLocalStorage";
import axios from "axios";

const ProductDetails = () => {
    const { axiosNotSecure } = useAxiosNotSecure();
    const { id } = useParams();

    const { data: productData = {}, isLoading } = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/${id}`);
            return res.data;
        },
    });

    const {
        category,
        description,
        image,
        images = [],
        name,
        nicotineStrength,
        price,
        status,
    } = productData;

    const [mainImage, setMainImage] = useState('');
    const [selectedNicotineStrength, setSelectedNicotineStrength] = useState(nicotineStrength ? nicotineStrength[0] : "");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (image) {
            setMainImage(image);
        }
    }, [image, productData]);

    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = (data) => {
        if (!selectedNicotineStrength) {
            return toast.error('Select NicotineStrength ')
        }
        const cartData = { productId: data._id, image: data.image, price: data.price, quantity, nicotineStrength: selectedNicotineStrength, name }
        console.log(cartData);
        addToDb(cartData)

    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-black text-white rounded-lg shadow-lg">
            <Toaster />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{name}</h1>
                <p className="text-gray-400 mb-2">
                    Category: <span className="font-semibold">{category}</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {/* Main Image with Magnification */}
                        <div className="w-full h-80 bg-gray-700 rounded-lg overflow-hidden">
                            <GlassMagnifier
                                imageSrc={mainImage}
                                imageAlt={name}
                            // magnifierSize="200px"
                            // magnifierBorderSize={2}
                            // magnifierBorderColor="rgba(255, 255, 255, 0.8)"
                            // square
                            />
                            <Magnifier
                                imageSrc={mainImage}
                                imageAlt="Example"
                            // largeImageSrc="./large-image.jpg" // Optional
                            // mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} // Optional
                            // touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
                            />
                        </div>

                        {/* Image Gallery */}
                        <div className="flex mt-4 gap-2">
                            {[image, ...images]?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className={`w-16 h-16 rounded-md cursor-pointer border ${mainImage === img ? "border-white" : "border-gray-700"}`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xl text-yellow-400 font-semibold mb-2">${price}</p>
                        <p className="text-gray-400 mb-2">
                            Status:
                            <span
                                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${status === "active" ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}
                            >
                                {status === "active" ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>

                        {/* Nicotine Strength Selection */}
                        <div className="mb-4">
                            <p className="text-gray-400 font-semibold mb-2">Select Nicotine Strength:</p>
                            <div className="flex gap-2">
                                {nicotineStrength?.map((strength, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedNicotineStrength(strength)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium border ${selectedNicotineStrength === strength ? "bg-indigo-500 border-indigo-500 text-white" : "bg-gray-800 border-gray-600 text-gray-400"}`}
                                    >
                                        {strength}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center mb-4">
                            <button
                                onClick={() => handleQuantityChange("decrease")}
                                className="bg-gray-700 text-white px-3 py-2 rounded-l-md"
                            >
                                -
                            </button>
                            <span className="bg-gray-800 text-white px-4 py-2">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange("increase")}
                                className="bg-gray-700 text-white px-3 py-2 rounded-r-md"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button onClick={() => handleAddToCart(productData)} className="mt-4 bg-yellow-500 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 shadow-lg hover:shadow-xl">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-6 bg-white p-8">
                <h2 className="text-xl font-bold text-black mb-2">Product Description</h2>
                <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
