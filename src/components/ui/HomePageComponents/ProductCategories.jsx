import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosNotSecure from '../../../Hooks/useAxiosNotSecure';
import { capitalizeFirstWords } from '../../../utils/capitalizeFirstWords';
import { Link } from 'react-router-dom';

// const categories = [
//     { id: 1, name: 'E-Liquids', image: 'https://images.unsplash.com/photo-1587324438678-77a1f6b44730', link: '/category/e-liquids' },
//     { id: 2, name: 'Vape Kits', image: 'https://images.unsplash.com/photo-1587881862870-36c812428a6c', link: '/category/vape-kits' },
//     { id: 3, name: 'Mods', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9', link: '/category/mods' },
//     { id: 4, name: 'Tanks', image: 'https://images.unsplash.com/photo-1512499617640-c2f9991e2f16', link: '/category/tanks' },
// ];

const ProductCategories = () => {
    const { axiosNotSecure } = useAxiosNotSecure()
    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category',],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/category`);
            return res.data;
        },
    });
    const categories = categoriesData.slice(0, 4).map(item => {
        const name = capitalizeFirstWords(item.category)
        return {
            id: item._id,
            name,
            link: `/category/${item.category}`,
            image: item.image
        }
    })
    console.log(categories);

    return (
        <section className="py-8 bg-backgroundColor border-b-2">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-textColor text-3xl font-bold mb-8">Product Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <div key={category.id} className="relative group border-2 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                            <img src={category.image} alt={category.name} className="w-full h-64 object-cover group-hover:opacity-75 transition duration-300 ease-in-out" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg transition duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                <Link to={category.link} className="text-white text-xl font-semibold bg-primaryColor px-4 py-2 rounded-full hover:bg-secondaryColor transition duration-300">
                                    {category.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;
