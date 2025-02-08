import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { capitalizeFirstWords } from "../../../utils/capitalizeFirstWords";
import Marquee from "react-fast-marquee";

const ProductCategories = () => {
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

  return (
    <section className="py-12  bg-gray-50">
      <div className="relative section-container py-8 bg-gray-100 rounded-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Explore Our Categories
        </h2>

        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover
          className="gap-16 flex"
        >
          {categories.map((category) => (
            <Link
              to={`/products/${category.name}`}
              key={category._id}
              className="relative flex flex-col items-center justify-center text-center bg-white rounded-lg p-6 mx-4 transition-transform transform cursor-pointer  group"
              style={{ width: "300px", height: "300px" }} // Fixed card dimensions
            >
              {/* Top-Right Angled Corner */}
              <div
                className="absolute top-0 left-0 h-0 w-0 rotate-90 border-t-[70px] border-l-[70px] border-solid border-t-transparent border-l-gray-100"
              ></div>


              {/* Image Section */}
              <div className="w-40 h-40 overflow-hidden  mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500 relative">
                {category.name}
                {/* Custom Underline */}
                <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              </h3>
            </Link>



          ))}
        </Marquee>
        <div className="flex justify-end mt-8">
          <Link to={'/categories'} className="px-6 py-2 m-2 inline-block  text-white uppercase transition-all duration-500 bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[length:200%_auto] rounded-lg shadow-lg hover:bg-right">
            More Category
          </Link>
        </div>
      </div>


    </section>
  );
};

export default ProductCategories;
