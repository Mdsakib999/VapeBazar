import React from 'react';

const featuredProducts = [
    { id: 1, name: 'Vape Kit', image: 'https://images.unsplash.com/photo-1587881862870-36c812428a6c', price: '$49.99' },
    { id: 2, name: 'E-Liquid', image: 'https://images.unsplash.com/photo-1587324438678-77a1f6b44730', price: '$19.99' },
    { id: 3, name: 'Vape Mod', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9', price: '$69.99' },
    { id: 4, name: 'Vape Tank', image: 'https://images.unsplash.com/photo-1512499617640-c2f9991e2f16', price: '$29.99' },
];

const FeaturedProducts = () => {
    return (
        <section className="py-12 bg-backgroundColor border-b-2">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-textColor text-4xl font-bold mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg bg-white">
                            <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-500 transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center text-white p-4">
                                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-xl mb-4">{product.price}</p>
                                    <button className="px-6 py-3 bg-primaryColor text-white text-lg rounded-full hover:bg-secondaryColor transition duration-300">
                                        Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-textColor">{product.name}</h3>
                                <p className="text-lg text-gray-500">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
