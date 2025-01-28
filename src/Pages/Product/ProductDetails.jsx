import React, { useState, useEffect } from "react";
import useAxiosNotSecure from "../../Hooks/useAxiosNotSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { Toaster, toast } from "sonner";
import { addToDb, deleteDB } from "../../utils/setLocalStorage";
import axios from "axios";
import ImageMagnifier from "../../components/ImageMagnifier";
import LoadingComponent from "../../components/LoadingComponent";

const ProductDetails = () => {
    const { axiosNotSecure } = useAxiosNotSecure();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [selectedNicotineStrength, setSelectedNicotineStrength] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [intervalId, setIntervalId] = useState(null);
    const [icon, setIcon] = useState('')
    const navigate = useNavigate()
    // Fetch product data
    const { data: productData = {}, isLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/${id}`);
            return res.data;
        },
    });
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const {
        category,
        description,
        image,
        images = [],
        name,
        nicotineStrength = [],
        price,
        status,
    } = productData;

    // Set the document title dynamically
    useEffect(() => {
        if (name) {
            setTitle(`${name} | Vape Smoke 24`);
            setIcon(image)
        }
    }, [name]);

    // Pulsing document title
    useEffect(() => {
        if (title) {
            let count = 0;
            const interval = setInterval(() => {
                document.title = count % 2 === 0 ? title : "Product Details";
                document.icon
                count++;
            }, 1000);
            setIntervalId(interval);

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [title]);

    // Set main image on initial load
    useEffect(() => {
        if (image) {
            setMainImage(image);
        }
    }, [image]);

    // Handle quantity change
    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    // Handle adding product to cart
    const handleAddToCart = (data) => {
        if (!selectedNicotineStrength) {
            toast.error("Please select a nicotine strength");
            return;
        }

        const cartData = {
            productId: data._id,
            image: data.image,
            price: data.price,
            quantity,
            nicotineStrength: selectedNicotineStrength,
            name,
        };

        addToDb(cartData);
        toast.success("Product added to cart!");
    };
    const handleBuyNow = (data) => {
        if (!selectedNicotineStrength) {
            toast.error("Please select a nicotine strength");
            return;
        }

        const cartData = {
            productId: data._id,
            image: data.image,
            price: data.price,
            quantity,
            nicotineStrength: selectedNicotineStrength,
            name,
        };
        deleteDB()
        addToDb(cartData);
        navigate('/checkout')
        toast.success("Product Buy Now!");
    }

    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <div className="bg-black text-white rounded-lg shadow-lg">
            <Toaster />
            <div className="max-w-6xl mx-auto p-6">
                {/* Product Title */}
                <h1 className="text-3xl font-bold mb-4">{name}</h1>
                <p className="text-gray-400 mb-2">
                    Category: <span className="font-semibold">{category}</span>
                </p>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {/* Image Section */}
                    <div>
                        {/* Main Image with Magnifier */}
                        <div className="w-full h-fit md:h-96 bg-gray-700 rounded-lg overflow-hidden">
                            <ImageMagnifier
                                src={mainImage}
                                width={300}
                                height={100}
                                magnifierHeight={150}
                                magnifierWidth={150}
                                zoomLevel={2}
                                className="w-full h-full"
                                alt="Sample Image"
                            />
                        </div>

                        {/* Image Gallery */}
                        <div className="flex mt-4 gap-2">
                            {[image, ...images]?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className={`w-16 h-16 rounded-md cursor-pointer border ${mainImage === img ? "border-white" : "border-gray-700"
                                        }`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col">
                        {/* Price */}
                        <p className="text-2xl text-yellow-400 font-semibold mb-4">Dhs {price}</p>

                        {/* Status */}
                        <p className="text-gray-400 mb-4">
                            Status:{" "}
                            <span
                                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${status === "active"
                                    ? "bg-green-700 text-green-200"
                                    : "bg-red-700 text-red-200"
                                    }`}
                            >
                                {status === "active" ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>

                        {/* Nicotine Strength Selector */}
                        <div className="mb-6 overflow-auto">
                            <p className="text-gray-400 font-semibold mb-2">Select Nicotine Strength:</p>
                            <div className="flex gap-2">
                                {nicotineStrength.map((strength, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedNicotineStrength(strength)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium border ${selectedNicotineStrength === strength
                                            ? "bg-indigo-500 border-indigo-500 text-white"
                                            : "bg-gray-800 border-gray-600 text-gray-400"
                                            }`}
                                    >
                                        {strength}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center mb-6">
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

                        {/* Add to Cart and Buy Now Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleAddToCart(productData)}
                                className="bg-yellow-500 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 shadow-lg hover:shadow-xl"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleBuyNow(productData)}
                                className="bg-yellow-500 text-black py-3 px-6 rounded-md font-semibold hover:bg-yellow-600 transition duration-200 shadow-lg hover:shadow-xl"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Product Description */}
            <div className="mt-6 bg-white p-8 rounded-lg shadow">
                <h2 className="text-xl font-bold text-black mb-2">Product Description</h2>
                <div
                    className="text-gray-600 leading-relaxed lg:prose-xl"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </div>
    );
};

export default ProductDetails;
