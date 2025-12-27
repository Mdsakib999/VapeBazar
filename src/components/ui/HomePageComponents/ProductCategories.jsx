import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { capitalizeFirstWords } from "../../../utils/capitalizeFirstWords";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Package } from "lucide-react";

const ProductCategories = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { data: categoriesData = [] } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/category/user`
            );
            return res.data;
        },
    });

    const categories = categoriesData?.map((item) => {
        const name = capitalizeFirstWords(item.category);
        return {
            id: item._id,
            name,
            link: `/products/${item.category}`,
            image: item.image,
        };
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById("categories-section");
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    return (
        <section id="categories-section" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`bg-particle-${i}`}
                        className="absolute rounded-full bg-gradient-to-br from-cyan-300/20 via-blue-300/20 to-purple-300/20 blur-2xl"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${100 + Math.random() * 20}%`,
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: `${-20 - Math.random() * 20}%`,
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                            ],
                            scale: [
                                Math.random() * 0.5 + 0.5,
                                Math.random() * 0.8 + 0.8,
                            ],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5,
                        }}
                        style={{
                            width: `${100 + Math.random() * 150}px`,
                            height: `${100 + Math.random() * 150}px`,
                        }}
                    />
                ))}

                {/* Glowing Orbs */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    {/* Decorative Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-50 to-blue-50 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm font-semibold tracking-wider text-cyan-700 uppercase">
                            Shop By Category
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-cyan-800 to-purple-900">
                            Explore Our
                        </span>
                        <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative">
                            Premium Categories
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isVisible ? { width: "100%" } : {}}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                            />
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
                    >
                        Discover our curated collection of premium vaping products across multiple categories
                    </motion.p>
                </motion.div>

                {/* Marquee Container with Enhanced Styling */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative"
                >
                    {/* Gradient Fades on Sides */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                    <Marquee
                        gradient={false}
                        speed={40}
                        pauseOnHover
                        className="py-8"
                    >
                        {categories.map((category, index) => (
                            <Link
                                to={`/products/${category.name}`}
                                key={category.id}
                                className="mx-4"
                                onMouseEnter={() => setHoveredCard(category.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group"
                                    style={{ width: "320px", height: "380px" }}
                                >
                                    {/* Main Card */}
                                    <div className="relative w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        {/* Animated Background Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Smoke Effect on Hover */}
                                        {hoveredCard === category.id && (
                                            <>
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={`smoke-${i}`}
                                                        className="absolute bottom-0 left-0 right-0"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{
                                                            opacity: [0, 0.4, 0],
                                                            y: [-20, -120],
                                                            x: [(i % 2 === 0 ? -1 : 1) * 20, (i % 2 === 0 ? 1 : -1) * 40],
                                                            scale: [1, 1.5],
                                                        }}
                                                        transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            delay: i * 0.3,
                                                        }}
                                                        style={{
                                                            left: `${i * 20}%`,
                                                        }}
                                                    >
                                                        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-cyan-400/40 via-blue-400/30 to-transparent blur-xl" />
                                                    </motion.div>
                                                ))}
                                            </>
                                        )}

                                        {/* Decorative Corner Elements */}
                                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-300/50 rounded-tr-2xl transition-all duration-500 group-hover:border-cyan-500" />
                                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-300/50 rounded-bl-2xl transition-all duration-500 group-hover:border-purple-500" />

                                        {/* Floating Icon Badge */}
                                        <motion.div
                                            className="absolute top-6 right-6 z-10"
                                            animate={{
                                                rotate: hoveredCard === category.id ? 360 : 0,
                                                scale: hoveredCard === category.id ? 1.1 : 1,
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                                                <Package className="w-5 h-5 text-white" />
                                            </div>
                                        </motion.div>

                                        {/* Content Container */}
                                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                                            {/* Image Section with Glow Effect */}
                                            <div className="relative mb-6">
                                                <motion.div
                                                    animate={{
                                                        scale: hoveredCard === category.id ? 1.05 : 1,
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl"
                                                >
                                                    {/* Glow Behind Image */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    
                                                    {/* Image */}
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />

                                                    {/* Overlay Gradient on Hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </motion.div>

                                                {/* Decorative Circles */}
                                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                                                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                            </div>

                                            {/* Category Name */}
                                            <div className="text-center">
                                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300">
                                                    {category.name}
                                                </h3>

                                                {/* Animated Underline */}
                                                <div className="relative h-1 w-0 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500" />

                                                {/* View More Link */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{
                                                        opacity: hoveredCard === category.id ? 1 : 0,
                                                        y: hoveredCard === category.id ? 0 : 10,
                                                    }}
                                                    className="flex items-center justify-center gap-2 mt-4 text-sm font-semibold text-cyan-600"
                                                >
                                                    <span>Explore Collection</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Shimmer Effect on Hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                            initial={{ x: "-100%" }}
                                            animate={{
                                                x: hoveredCard === category.id ? "100%" : "-100%",
                                            }}
                                            transition={{ duration: 0.8 }}
                                            style={{ skewX: "-20deg" }}
                                        />
                                    </div>

                                    {/* Floating Shadow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-95" />
                                </motion.div>
                            </Link>
                        ))}
                    </Marquee>
                </motion.div>

                {/* View All Categories Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <Link to="/categories">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-[length:200%_100%] text-white font-bold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Animated Background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-[length:200%_100%]"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Button Content */}
                            <span className="relative z-10 flex items-center gap-3">
                                <span>View All Categories</span>
                                <motion.div
                                    animate={{
                                        x: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </span>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-white/20 blur-xl" />
                            </div>
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Decorative Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};

export default ProductCategories;