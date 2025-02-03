import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { capitalizeFirstWords } from "../../../utils/capitalizeFirstWords";

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

  const categories = categoriesData.slice(0, 4).map((item) => {
    const name = capitalizeFirstWords(item.category);
    return {
      id: item._id,
      name,
      link: `/products/${item.category}`,
      image: item.image,
    };
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-center  font-bold text-gray-800 mb-10">
          <p className="text-3xl">Our Product Categories</p>
          <Link to={"/categories"} className="mt-3 block">
            See More
          </Link>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {categories.map((category) => (
            <div
              key={category._id}
              className="relative group flex flex-col items-center justify-center text-center rounded-full bg-white shadow-lg border-2 border-gray-200 hover:shadow-2xl transition duration-300 p-4"
            >
              {/* Image Section */}
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-md transition-transform transform group-hover:scale-110 duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Category Name */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              {/* Button */}
              <Link
                to={category.link}
                className="mt-2 text-sm font-semibold px-6 py-2 m-2 text-white uppercase transition-all duration-500 bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[length:200%_auto] rounded-lg shadow-lg hover:bg-right"
              >
                Explore Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button className="px-6 py-2 m-2 text-white uppercase transition-all duration-500 bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[length:200%_auto] rounded-lg shadow-lg hover:bg-right">
        Gradient Button
      </button>
    </section>
  );
};

export default ProductCategories;
