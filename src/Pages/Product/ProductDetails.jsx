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
import RelatedProducts from "./RelatedProducts";
import { FiShoppingCart, FiHeart, FiShare2, FiCheck, FiPackage, FiTruck, FiShield } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";

const ProductDetails = () => {
    const { axiosNotSecure } = useAxiosNotSecure();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [selectedNicotineStrength, setSelectedNicotineStrength] = useState("");
    const [selectedFlavour, setSelectedFlavour] = useState("");
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
        _id,
        category,
        description,
        image,
        images = [],
        flavour,
        name,
        nicotineStrength = [],
        price,
        status,
        discount_price
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

            return () => clearInterval(interval);
        }
    }, [title]);


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
        if (!selectedNicotineStrength && nicotineStrength.length > 0) {
            toast.error("Please select a nicotine strength");
            return;
        }
        if (!selectedFlavour && flavour.length > 0) {
            toast.error("Please select a Flavours");
            return;
        }
        const discountedPrice = data.discount_price
            ? data.price - (data.price * data.discount_price) / 100
            : data.price;

        const displayPrice = Math.round(discountedPrice);

        const cartData = {
            productId: data._id,
            image: data.image,
            price: displayPrice,
            quantity,
            nicotineStrength: selectedNicotineStrength || '',
            name,
            flavour: selectedFlavour || ''
        };
        addToDb(cartData);
        toast.success("Product added to cart!");
    };

    const handleBuyNow = (data) => {
        if (!selectedNicotineStrength) {
            toast.error("Please select a nicotine strength");
            return;
        }
        const discountedPrice = data.discount_price
            ? data.price - (data.price * data.discount_price) / 100
            : data.price;

        const displayPrice = Math.round(discountedPrice);

        const cartData = {
            productId: data._id,
            image: data.image,
            price: displayPrice,
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

    const discountedPrice = discount_price
        ? price - (price * discount_price) / 100
        : price;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
            <Toaster position="top-center" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span className="hover:text-indigo-600 cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="hover:text-indigo-600 cursor-pointer capitalize">{category}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate max-w-xs">{name}</span>
                </div>

                {/* Main Product Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                        {/* Image Section */}
                        <div className="space-y-4">
                            {/* Discount Badge */}
                            {discount_price && discount_price !== 0 && (
                                <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                                    <BsLightningChargeFill />
                                    {discount_price}% OFF
                                </div>
                            )}

                            {/* Main Image */}
                            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden group">
                                <ImageMagnifier
                                    src={mainImage}
                                    width={600}
                                    height={600}
                                    magnifierHeight={200}
                                    magnifierWidth={200}
                                    zoomLevel={2.5}
                                    className="w-full h-full object-contain p-8"
                                    alt={name}
                                />

                                {/* Quick Actions */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white p-3 rounded-full shadow-lg hover:bg-indigo-50 transition-colors">
                                        <FiHeart className="text-gray-700" />
                                    </button>
                                    <button className="bg-white p-3 rounded-full shadow-lg hover:bg-indigo-50 transition-colors">
                                        <FiShare2 className="text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Image Gallery */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {[image, ...images]?.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setMainImage(img)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl cursor-pointer transition-all duration-300 ${mainImage === img
                                            ? "ring-4 ring-indigo-500 scale-105 shadow-lg"
                                            : "ring-2 ring-gray-200 hover:ring-gray-300"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="flex flex-col space-y-6">
                            {/* Category Badge */}
                            <div>
                                <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                                    {category?.charAt(0).toUpperCase() + category?.slice(1)}
                                </span>
                            </div>

                            {/* Product Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                {name}
                            </h1>

                            {/* Price Section */}
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-gray-900">
                                    Dhs {Math.round(discountedPrice)}
                                </span>
                                {discount_price && discount_price !== 0 && (
                                    <>
                                        <del className="text-2xl text-gray-400 font-semibold">
                                            Dhs {price}
                                        </del>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                            Save Dhs {Math.round(price - discountedPrice)}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Status Badge */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium">Availability:</span>
                                <span
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {status === "active" ? <FiCheck /> : <FiPackage />}
                                    {status === "active" ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200"></div>

                            {/* Nicotine Strength Selector */}
                            {
                                nicotineStrength.length > 0 && <div className="space-y-3">
                                    <label className="text-gray-900 font-bold text-lg">
                                        Select Nicotine Strength
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {nicotineStrength.map((strength, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedNicotineStrength(strength)}
                                                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${selectedNicotineStrength === strength
                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                                                    }`}
                                            >
                                                {strength}
                                            </button>
                                        ))}
                                    </div>
                                    {selectedNicotineStrength && (
                                        <p className="text-sm text-gray-500 italic">Please select a strength to continue</p>
                                    )}
                                </div>
                            }
                            {
                                flavour.length > 0 && <div className="space-y-3">
                                    <label className="text-gray-900 font-bold text-lg">
                                        Select Flavour
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {flavour.map((strength, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedFlavour(strength)}
                                                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${selectedFlavour === strength
                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                                                    }`}
                                            >
                                                {strength}
                                            </button>
                                        ))}
                                    </div>
                                    {!selectedFlavour && (
                                        <p className="text-sm text-gray-500 italic">Please select a strength to continue</p>
                                    )}
                                </div>
                            }

                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <label className="text-gray-900 font-bold text-lg">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange("decrease")}
                                            className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-lg transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-8 py-3 bg-white text-gray-900 font-bold text-lg min-w-[80px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange("increase")}
                                            className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-gray-600">
                                        Total: <span className="font-bold text-gray-900">Dhs {Math.round(discountedPrice * quantity)}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => handleAddToCart(productData)}
                                    className="flex-1 bg-white border-2 border-indigo-600 text-indigo-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                                >
                                    <FiShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => handleBuyNow(productData)}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-105"
                                >
                                    <BsLightningChargeFill size={20} />
                                    Buy Now
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="bg-indigo-100 p-2 rounded-lg">
                                        <FiTruck className="text-indigo-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Free Delivery</p>
                                        <p className="font-semibold text-gray-900 text-sm">On orders over Dhs 200</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <FiShield className="text-green-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Secure Payment</p>
                                        <p className="font-semibold text-gray-900 text-sm">100% Protected</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <FiPackage className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Easy Returns</p>
                                        <p className="font-semibold text-gray-900 text-sm">7 Days Return</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></span>
                        Product Description
                    </h2>
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>

                {/* Related Products */}
                <RelatedProducts category={category} id={_id} />
            </div>
        </div>
    );
};

export default ProductDetails;