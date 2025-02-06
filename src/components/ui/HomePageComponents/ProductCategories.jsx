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
            <div
              key={category._id}
              className="flex flex-col items-center  justify-center text-center bg-white rounded-lg border-4 border-transparent shadow-lg p-6 mx-4 transition-transform transform cursor-pointer hover:border-blue-500 hover:shadow-xl group"
            >
              {/* Image Section */}
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Category Name */}
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primaryColor relative">
                {category.name}
                {/* Custom Underline */}
                <span className="absolute left-1/2 -bottom-0  h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>

              </h3>
            </div>
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
