import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Carousel = () => {
    const swiperRef = useRef(null);

    const slides = [
        {
            id: 1,
            heading: "Experience the Best Vapes",
            description: "Premium quality vapes with unbeatable performance and style.",
            image: "/homePage/banner.jpg",
        },
        {
            id: 2,
            heading: "Modern Vaping Redefined",
            description: "Discover advanced vaping solutions for the modern enthusiast.",
            image: "https://media.istockphoto.com/id/1396683789/photo/beautiful-brunette-smoke-electronic-cigarette.jpg?s=1024x1024&w=is&k=20&c=nk9ifyCDo0XzuohnNZXj4fNxkh9a6C9rMNSiBoZTCRA=",
        },
        {
            id: 3,
            heading: "Your Vape, Your Style",
            description: "Choose the perfect vape that matches your lifestyle and preferences.",
            image: "/homePage/banner.jpg",
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative w-full max-w-full h-screen mx-auto">
                {/* Custom Navigation Buttons */}
                <div className="absolute right-4 -bottom-2  md:top-1/2 transform -translate-y-1/2 z-10 flex flex-row md:flex-col gap-4 lg:top-1/2 lg:transform -lg:translate-y-1/2 sm:bottom-6 sm:right-1/2 sm:translate-x-1/2 sm:transform lg:bottom-auto lg:right-4 lg:translate-x-0">
                    <button
                        className="bg-black/50 p-3 rounded-full hover:bg-black/70 transition-all"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        className="bg-black/50 p-3 rounded-full hover:bg-black/70 transition-all"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>


                {/* Swiper Component */}
                <Swiper
                    modules={[Navigation, Autoplay, EffectFade]}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-screen relative"
                            >
                                {/* Background Image */}
                                <img
                                    src={slide.image}
                                    alt={slide.heading}
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>

                                {/* Centered Content */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6"
                                >
                                    <h1 className="text-5xl font-bold mb-4">{slide.heading}</h1>
                                    <p className="text-lg max-w-2xl mb-6">{slide.description}</p>
                                    <Link
                                        to="/product"
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-all"
                                    >
                                        Shop Now
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Carousel;
