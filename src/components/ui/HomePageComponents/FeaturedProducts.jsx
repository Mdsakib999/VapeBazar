import { useQuery } from "@tanstack/react-query";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const hasDiscount = product.discount_price && product.discount_price !== 0;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.discount_price - product.price) / product.discount_price) *
          100
      )
    : 0;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const productLink = `${window.location.origin}/product/${product._id}`;
    const message = encodeURIComponent(
      `Hi! I want to buy this product now:\n\n*${product.name}*\nPrice: Dhs ${product.price}\n🔗 ${productLink}\n\nCan you help me place an order?`
    );
    window.open(`https://wa.me/971524869090?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 "
      style={{
        boxShadow: "0 2px 16px rgba(80,60,180,0.07)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 50px rgba(100,70,200,0.16)",
      }}
    >
      {/* ── Image ── */}
      <Link to={`/product/${product._id}`} className="relative block overflow-hidden">
        {/* Dark hover overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none " />

        <img
          className="h-52 sm:h-56 w-full object-cover transform group-hover:scale-[1.07] transition-transform duration-700 ease-out"
          src={product.image}
          alt={product.name}
        />

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-20 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide">
            -{discountPercent}%
          </span>
        )}

        {/* Category pill */}
        {/* <span className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-purple-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span> */}
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-4">
        {/* Name */}
        <Link to={`/product/${product._id}`}>
          <h3 className="md:text-lg font-semibold text-gray-900 leading-snug mb-2 hover:text-purple-600 transition-colors line-clamp-1">
            {product.name.length > 26
              ? product.name.slice(0, 26) + "…"
              : product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className=" flex justify-between items-center mb-2">
            
        <div className="flex items-center gap-0.5 ">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-amber-400 text-[12px]" />
          ))}
          <span className="text-[11px] text-gray-400 ml-1.5 font-medium">5.0</span>
        </div>
        {/* Category pill */}
        <span className=" bg-purple-50 text-purple-700 text-[13px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        </div>
        

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Dhs {product.price}
          </span>
          {hasDiscount && (
            <del className="text-sm font-medium text-gray-400">
              Dhs {product.discount_price}
            </del>
          )}
        </div>

        {/* Thin divider */}
        <div className="h-px bg-gray-100 mb-1" />

        {/* ── Buttons ── */}
        <div className="flex items-center gap-2 mt-auto">
          {/* View Details */}
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#3b82f6 0%,#7c3aed 100%)",
              boxShadow: "0 4px 14px rgba(124,58,237,0.22)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(124,58,237,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(124,58,237,0.22)")
            }
          >
            View Details
          </Link>

          {/* WhatsApp */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleWhatsApp}
            title="Buy via WhatsApp"
            className="flex items-center justify-center shrink-0 text-white rounded-xl transition-all duration-300"
            style={{
              width: 44,
              height: 42,
              background: "#22c55e",
              boxShadow: "0 4px 12px rgba(34,197,94,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(34,197,94,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#22c55e";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(34,197,94,0.3)";
            }}
          >
            <FaWhatsapp className="text-[20px]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────── */

const FeaturedProducts = () => {
  const {
    data: productData = [],
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/products`
      );
      return res.data;
    },
  });

  const featuredProducts = productData?.products?.slice(0, 6);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center text-black text-4xl font-extrabold mb-6">
          Featured Products
        </h2>
        <p className="text-black text-center lg:w-[50%] mx-auto">
          Explore our carefully curated collection of top-tier vape devices and
          flavors, crafted to deliver exceptional performance, bold taste, and
          an unforgettable experience with every single puff.
        </p>

        {/* Grid — 1 col on mobile → 2 col on sm → 3 col on lg */}
        <div className="mt-4 md:mt-0 mx-auto md:w-4/5 lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-1 md:px-4 py-11">
          {featuredProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All button — unchanged from original */}
        <div className="flex justify-center items-center">
          <Link to="/product">
            <motion.button className="group relative px-10 mt-5 py-4 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 bg-[length:200%_100%] text-white font-bold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <span>View All Product</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-white/20 blur-xl" />
              </div>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineHeart } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";

// const FeaturedProducts = () => {
//     const { data: productData = [], isLoading, error } = useQuery({
//         queryKey: ['products'],
//         queryFn: async () => {
//             const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`);
//             return res.data;
//         },
//     });

//     const featuredProducts = productData?.products?.slice(0, 4) || [
//         {
//             _id: "1",
//             name: "Sample Product 1",
//             images: ["https://via.placeholder.com/250"],
//             rating: 4.5,
//             discount_price: 50,
//             regular_price: 100
//         },
//         {
//             _id: "2",
//             name: "Sample Product 2",
//             images: ["https://via.placeholder.com/250"],
//             rating: 4.0,
//             discount_price: 75,
//             regular_price: 150
//         },
//         {
//             _id: "3",
//             name: "Sample Product 3",
//             images: ["https://via.placeholder.com/250"],
//             rating: 5.0,
//             discount_price: 90,
//             regular_price: 120
//         },
//         {
//             _id: "4",
//             name: "Sample Product 4",
//             images: ["https://via.placeholder.com/250"],
//             rating: 3.5,
//             discount_price: 40,
//             regular_price: 80
//         }
//     ];

//     return (
//         <section className="py-12 bg-white">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-center text-black text-4xl font-extrabold mb-6">
//                     Featured Products
//                 </h2>
//                 <p className='text-black text-center lg:w-[50%] mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequuntur, saepe quia sed hic iure fugit pariatur tempore, eius consequatur est ut harum ea optio sapiente? Quo, dolore quam.</p>
//                 <div className="w-4/5 mt-4 md:mt-0 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 px-1 md:px-4 py-11">
//                     {featuredProducts.map((product) => (
//                         <div
//                             key={product._id}
//                             className="group border border-gray-300 rounded-xl bg-white text-black  hover:shadow-lg overflow-hidden transition-shadow duration-300 "
//                         >
//                             <Link to={`/product/${product._id}`}>
//                                 <img
//                                     className="max-h-[250px] w-full rounded-t-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
//                                     src={product.images[0]}
//                                     alt={product.name}
//                                 />
//                                 <div className="px-4 flex flex-col justify-baseline ">
//                                     <p className="text-xl font-semibold mt-4 ">{product.name}</p>
//                                     <div className='flex my-2 justify-between'>
//                                     <p className="text-lg text-gray-500 ">
//                                          By{" "}
//                                          <span className="text-red-500 font-semibold">
//                                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                                          </span>
//                                      </p>
//                                     <div className="flex items-center gap-x-2 text-yellow-400 ">
//                                         {[...Array(5)].map((_, index) => (
//                                             <FaStar
//                                                 key={index}
//                                                 className={
//                                                     index < Math.round(product.rating)
//                                                         ? "text-yellow-400"
//                                                         : "text-gray-300"
//                                                 }
//                                             />
//                                         ))}
//                                         <p className="text-black">{product.rating}/5.0</p>
//                                     </div>
//                                     </div>
//                                     <div className="flex gap-x-3 justify-between items-center mb-5">
//                                         <p className="text-xl font-bold">${product.price}</p>

//                                         <del className="text-xl font-semibold text-gray-400">
//                                             500.00
//                                         </del>
//                                         <p className="text-red-500 font-semibold px-2 rounded-full bg-red-100">
//                                             -
//                                             {Math.round(
//                                                 ((500 - product.discount_price) /
//                                                     product.regular_price) *
//                                                 100
//                                             )}%
//                                         </p>
//                                     </div>
//                                     <div className="flex justify-center">
//                                         <button className="border-gray-400 px-4 py-2 mb-4 rounded-lg font-semibold text-white transition-all duration-500 bg-gradient-to-r from-[#03b8e1] via-[#112949] to-[#00c4f5] bg-[length:200%_auto] shadow-lg hover:bg-right">
//                                             Add to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeaturedProducts;
