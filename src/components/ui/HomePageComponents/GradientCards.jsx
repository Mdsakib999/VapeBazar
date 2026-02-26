import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import img1 from "../../../assets/vecteezy_vape-store-logo-design-template_10634918-removebg-preview.png";
import img2 from "../../../assets/vecteezy_vape-esport-logo-company_5076554-removebg-preview.png";

const GradientCards = () => {
    const cards = [
        {
            id: 1,
            title: "IGNITE YOUR SENSES",
            description: "Unleash the power of flavors",
            buttonText: "Shop Now",
            bgGradient: "from-red-500 via-orange-500 to-amber-400",
            accentColor: "bg-red-600",
            icon: Flame,
            image: img1,
            pattern: "radial",
        },
        {
            id: 2,
            title: "ELEVATE YOUR EXPERIENCE",
            description: "Upgrade your vaping journey",
            buttonText: "Shop Now",
            bgGradient: "from-lime-500 via-emerald-500 to-teal-400",
            accentColor: "bg-emerald-600",
            icon: Sparkles,
            image: img2,
            pattern: "mesh",
        },
    ];

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                        Discover Your Perfect
                        <span className="block bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-transparent pb-4 ">
                            Vaping Experience
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto ">
                        Premium collections crafted for the modern enthusiast
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {cards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <div
                                key={card.id}
                                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >
                                {/* Animated Background Gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} transition-transform duration-700 group-hover:scale-110`}
                                />

                                {/* Decorative Pattern Overlay */}
                                {card.pattern === "radial" && (
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
                                    </div>
                                )}

                                {card.pattern === "mesh" && (
                                    <div className="absolute inset-0 opacity-10">
                                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <pattern id={`pattern-${card.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <circle cx="20" cy="20" r="1" fill="white" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill={`url(#pattern-${card.id})`} />
                                        </svg>
                                    </div>
                                )}

                                {/* Content Container */}
                                <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 min-h-[320px] sm:min-h-[360px] md:min-h-[400px] flex flex-col">
                                    {/* Icon Badge */}
                                    <div className="mb-6 md:mb-8">
                                        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                            <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 space-y-3 md:space-y-4">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                                            {card.title}
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-md drop-shadow">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Bottom Section - Button & Image */}
                                    <div className="mt-8 flex items-end justify-between gap-4">
                                        {/* CTA Button */}
                                        <Link
                                            to="/product"
                                            className="group/btn inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <span className="text-sm md:text-base">{card.buttonText}</span>
                                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
                                        </Link>

                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex-shrink-0">
                                            <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500" />
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shine Effect on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>

                                {/* Border Glow */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Section */}
                {/* <div className="mt-12 md:mt-16 text-center">
                    <p className="text-gray-600 text-sm md:text-base mb-4">
                        Join thousands of satisfied customers worldwide
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 border-2 border-white"
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">2000+ Reviews</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm font-bold text-gray-700">4.9/5</span>
                        </div>
                    </div>
                </div> */}
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .group {
                    animation: slideInUp 0.6s ease-out backwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .group {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default GradientCards;