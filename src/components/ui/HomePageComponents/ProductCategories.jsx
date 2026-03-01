import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { capitalizeFirstWords } from "../../../utils/capitalizeFirstWords";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Package } from "lucide-react";

const ProductCategories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef(null);

  const { data: categoriesData = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/category/user`,
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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    const section = document.getElementById("categories-section");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Duplicate the list so the scroll loop is seamless.
  // We render [original + duplicate] side by side; the CSS animation
  // translates by exactly 50% (the width of the original set), then resets.
  const loopCategories = categories.length > 0 ? [...categories, ...categories] : [];
  console.log(categories)

  // Total width of ONE set = count * (card 220px + mx-3*2 = 24px gap) = 244px each
  const cardWidth = 244; // 220 card + 24 margin (mx-3 on each side)
  const singleSetWidth = categories.length * cardWidth;

  return (
    <section
      id="categories-section"
      className="relative py-10 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Static background orbs */}
      <div className="absolute top-16 left-8 w-56 h-56 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-8 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Keyframe styles injected inline so no external CSS file is needed */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${singleSetWidth}px); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll ${Math.max(singleSetWidth / 40, 8)}s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-50 to-blue-50">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-700 uppercase">
              Shop By Category
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-cyan-800 to-purple-900">
              Explore Our
            </span>
            <br />
            <span className="pb-2 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
              Premium Categories
              <motion.div
                initial={{ width: 0 }}
                animate={isVisible ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
              />
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mt-4">
            Discover our curated collection of premium vaping products across
            multiple categories
          </p>
        </motion.div>

        {/* Scrolling Track */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Side fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Outer clip */}
          <div className="overflow-hidden py-6">
            {/* Track: original set + duplicate for seamless loop */}
            <div ref={trackRef} className="marquee-track">
              {loopCategories.map((category, i) => (
                <Link
                  to={`/products/${category.name}`}
                  key={`${category.id}-${i}`}
                  className="mx-3 flex-shrink-0"
                  onMouseEnter={() => setHoveredCard(`${category.id}-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {
                    console.log(category)
                  }
                  <div
                    className="relative group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ width: "220px", height: "270px" }}
                  >
                    {/* Hover bg tint */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-cyan-300/40 rounded-tr-2xl group-hover:border-cyan-500 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-purple-300/40 rounded-bl-2xl group-hover:border-purple-500 transition-colors duration-300" />

                    {/* Icon badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-5">
                      {/* Image */}
                      <div className="relative mb-4 w-32 h-32 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Name */}
                      <div className="text-center">
                        <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300">
                          {category.name}
                        </h3>

                        {/* Underline */}
                        <div className="h-0.5 w-0 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300" />

                        {/* Explore link */}
                        <div
                          className="flex items-center justify-center gap-1 mt-3 text-xs font-semibold text-cyan-600 transition-all duration-300"
                          style={{
                            opacity:
                              hoveredCard === `${category.id}-${i}` ? 1 : 0,
                            transform:
                              hoveredCard === `${category.id}-${i}`
                                ? "translateY(0)"
                                : "translateY(6px)",
                          }}
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Floating shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-95" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link to="/product">
            <button className="group relative px-8 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm sm:text-base rounded-full overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-2">
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;