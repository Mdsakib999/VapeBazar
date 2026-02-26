import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Wind } from "lucide-react";
import { Link } from "react-router-dom";

const Carousel = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

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

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Custom Navigation Buttons */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:right-8 md:top-1/2 md:-translate-y-1/2 md:left-auto md:translate-x-0 z-50 flex flex-row md:flex-col gap-3">
                <button
                    className="p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                    className="p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-8 left-8 z-50 flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                    <span className="text-white font-bold text-lg">
                        {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/50">/</span>
                    <span className="text-white/70 text-sm">
                        {String(slides.length).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Swiper Component */}
            <Swiper
                modules={[Navigation, Autoplay, EffectFade, Pagination]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                speed={800}
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
                {slides.map((slide) => {
                    const IconComponent = slide.icon;
                    return (
                        <SwiperSlide key={slide.id}>
                            {({ isActive }) => (
                                <div className="h-screen relative">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={slide.image}
                                            alt={slide.heading}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accent} opacity-20 mix-blend-overlay`} />

                                    {/* Content */}
                                    {isActive && (
                                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 animate-fadeIn">
                                            {/* Decorative Icon */}
                                            <div className="mb-6 relative">
                                                <div className="relative p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>
                                            </div>

                                            {/* Heading */}
                                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                                                <span
                                                    className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${slide.accent} drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]`}
                                                    style={{
                                                        WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                                                    }}
                                                >
                                                    {slide.heading}
                                                </span>
                                            </h1>

                                            {/* Description */}
                                            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mb-10 leading-relaxed">
                                                {slide.description}
                                            </p>

                                            {/* CTA Buttons */}
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                <Link to="/product">
                                                    <button
                                                        className={`relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform duration-200 hover:scale-105`}
                                                    >
                                                        <span className="relative z-10 text-white flex items-center gap-2">
                                                            Shop Now
                                                            <ChevronRight className="w-5 h-5" />
                                                        </span>
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`}
                                                        />
                                                    </button>
                                                </Link>

                                                <Link to="/about">
                                                    <button className="px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200">
                                                        Learn More
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Feature Pills */}
                                            <div className="flex flex-wrap gap-3 mt-12 justify-center">
                                                {["Premium Quality", "Fast Shipping", "Best Price"].map(
                                                    (feature) => (
                                                        <div
                                                            key={feature}
                                                            className="px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-sm text-gray-300 hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
                                                        >
                                                            {feature}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

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
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }

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