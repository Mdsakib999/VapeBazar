import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const Carousel = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const slides = [
        {
            id: 1,
            heading: "Experience the Best Vapes",
            description: "Premium quality vapes with unbeatable performance and style.",
            image: "/homePage/banner.jpg",
            accent: "from-cyan-500 via-blue-500 to-purple-600",
            icon: Sparkles,
        },
        {
            id: 2,
            heading: "Modern Vaping Redefined",
            description: "Discover advanced vaping solutions for the modern enthusiast.",
            image: "https://media.istockphoto.com/id/1396683789/photo/beautiful-brunette-smoke-electronic-cigarette.jpg?s=1024x1024&w=is&k=20&c=nk9ifyCDo0XzuohnNZXj4fNxkh9a6C9rMNSiBoZTCRA=",
            accent: "from-pink-500 via-rose-500 to-orange-500",
            icon: Zap,
        },
        {
            id: 3,
            heading: "Your Vape, Your Style",
            description: "Choose the perfect vape that matches your lifestyle and preferences.",
            image: "/homePage/banner.jpg",
            accent: "from-emerald-500 via-teal-500 to-cyan-500",
            icon: Wind,
        },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 30 - 15,
                y: (e.clientY / window.innerHeight) * 30 - 15,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full bg-white/5 blur-2xl"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: "120%",
                            scale: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: "-20%",
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                            ],
                            scale: [
                                Math.random() * 0.5 + 0.5,
                                Math.random() * 0.8 + 0.8,
                                Math.random() * 0.5 + 0.5,
                            ],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.3,
                        }}
                        style={{
                            width: `${80 + Math.random() * 120}px`,
                            height: `${80 + Math.random() * 120}px`,
                        }}
                    />
                ))}
            </div>

            {/* Custom Navigation Buttons */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:right-8 md:top-1/2 md:-translate-y-1/2 md:left-auto md:translate-x-0 z-50 flex flex-row md:flex-col gap-3">
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
            </div>

            {/* Slide Counter */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-8 left-8 z-50 flex items-center gap-3"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                    <span className="text-white font-bold text-lg">
                        {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/50">/</span>
                    <span className="text-white/70 text-sm">
                        {String(slides.length).padStart(2, "0")}
                    </span>
                </div>
            </motion.div>

            {/* Swiper Component */}
            <Swiper
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                speed={1200}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/40 !w-12 !h-1 !rounded-full",
                    bulletActiveClass: "!bg-white !w-16",
                }}
                className="h-full"
            >
                {slides.map((slide, index) => {
                    const IconComponent = slide.icon;
                    return (
                        <SwiperSlide key={slide.id}>
                            {({ isActive }) => (
                                <div className="h-screen relative">
                                    {/* Background Image with Parallax */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={
                                            isActive
                                                ? {
                                                      scale: 1.1,
                                                      x: mousePosition.x,
                                                      y: mousePosition.y,
                                                  }
                                                : { scale: 1 }
                                        }
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.heading}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>

                                    {/* Dynamic Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accent} opacity-20 mix-blend-overlay`} />

                                    {/* Smoke Effects - Layered for depth */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <>
                                                {/* Bottom smoke layer */}
                                                {[...Array(8)].map((_, i) => (
                                                    <motion.div
                                                        key={`smoke-bottom-${i}`}
                                                        className="absolute bottom-0 left-0 right-0"
                                                        initial={{ opacity: 0, y: 100 }}
                                                        animate={{
                                                            opacity: [0, 0.6, 0.3, 0],
                                                            y: [-20, -200, -400],
                                                            x: [0, (i % 2 === 0 ? 1 : -1) * 100],
                                                            scale: [1, 1.5, 2],
                                                        }}
                                                        transition={{
                                                            duration: 8 + i,
                                                            repeat: Infinity,
                                                            delay: i * 0.8,
                                                            ease: "easeOut",
                                                        }}
                                                        style={{
                                                            left: `${i * 12}%`,
                                                        }}
                                                    >
                                                        <div
                                                            className={`w-64 h-64 rounded-full bg-gradient-to-t ${slide.accent} blur-3xl opacity-40`}
                                                        />
                                                    </motion.div>
                                                ))}

                                                {/* Floating vapor clouds */}
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={`vapor-${i}`}
                                                        className="absolute"
                                                        initial={{
                                                            opacity: 0,
                                                            x: `${30 + i * 15}%`,
                                                            y: `${50 + Math.random() * 30}%`,
                                                        }}
                                                        animate={{
                                                            opacity: [0, 0.4, 0.2, 0],
                                                            y: [
                                                                `${50 + Math.random() * 30}%`,
                                                                `${20 + Math.random() * 20}%`,
                                                            ],
                                                            x: [
                                                                `${30 + i * 15}%`,
                                                                `${40 + i * 15}%`,
                                                            ],
                                                            scale: [1, 1.3, 1.6],
                                                            rotate: [0, 360],
                                                        }}
                                                        transition={{
                                                            duration: 12 + i * 2,
                                                            repeat: Infinity,
                                                            delay: i * 1.2,
                                                            ease: "easeInOut",
                                                        }}
                                                    >
                                                        <div className="w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                                                    </motion.div>
                                                ))}
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {/* Content */}
                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.div
                                                key={slide.id}
                                                variants={containerVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
                                            >
                                                {/* Decorative Icon */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="mb-6 relative"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            rotate: 360,
                                                            scale: [1, 1.2, 1],
                                                        }}
                                                        transition={{
                                                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                                        }}
                                                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${slide.accent} blur-xl opacity-50`}
                                                    />
                                                    <div className="relative p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                                                        <IconComponent className="w-8 h-8 text-white" />
                                                    </div>
                                                </motion.div>

                                                {/* Heading */}
                                                <motion.h1
                                                    variants={itemVariants}
                                                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                                                >
                                                    <span
                                                        className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${slide.accent} drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]`}
                                                        style={{
                                                            WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                                                        }}
                                                    >
                                                        {slide.heading}
                                                    </span>
                                                </motion.h1>

                                                {/* Description */}
                                                <motion.p
                                                    variants={itemVariants}
                                                    className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mb-10 leading-relaxed"
                                                >
                                                    {slide.description}
                                                </motion.p>

                                                {/* CTA Buttons */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex flex-wrap gap-4 justify-center"
                                                >
                                                    <Link to="/product">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className={`group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300`}
                                                        >
                                                            <span className="relative z-10 text-white flex items-center gap-2">
                                                                Shop Now
                                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </span>
                                                            <div
                                                                className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`}
                                                            />
                                                            <motion.div
                                                                className="absolute inset-0 bg-white/20"
                                                                initial={{ x: "-100%" }}
                                                                whileHover={{ x: "100%" }}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                        </motion.button>
                                                    </Link>

                                                    <Link to="/about">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                                                        >
                                                            Learn More
                                                        </motion.button>
                                                    </Link>
                                                </motion.div>

                                                {/* Feature Pills */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex flex-wrap gap-3 mt-12 justify-center"
                                                >
                                                    {["Premium Quality", "Fast Shipping", "Best Price"].map(
                                                        (feature, i) => (
                                                            <motion.div
                                                                key={feature}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 1 + i * 0.1 }}
                                                                className="px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-sm text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
                                                            >
                                                                {feature}
                                                            </motion.div>
                                                        )
                                                    )}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Decorative Corner Elements */}
                                    <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10 pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/10 pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/10 pointer-events-none" />
                                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10 pointer-events-none" />
                                </div>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Custom Pagination Styling */}
            <style jsx>{`
                :global(.swiper-pagination) {
                    bottom: 40px !important;
                }
                
                :global(.swiper-pagination-bullet) {
                    transition: all 0.3s ease;
                }
                
                :global(.swiper-pagination-bullet:hover) {
                    background: rgba(255, 255, 255, 0.6) !important;
                }

                @media (max-width: 768px) {
                    :global(.swiper-pagination) {
                        bottom: 80px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Carousel;