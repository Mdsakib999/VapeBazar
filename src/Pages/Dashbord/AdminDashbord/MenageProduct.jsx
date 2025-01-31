import React, { useState, useEffect } from "react";
import { Switch } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from 'sonner'

const ManageProducts = () => {
    const navigate = useNavigate();
    const { axiosNotSecure } = useAxiosNotSecure();
    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category',],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/category`);
            return res.data;
        },
    });
    const categoryOptions = categoriesData.map(item => ({ option: item.category }))

    // State variables
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');

    // const categories = categoriesData.map(item => {
    //     const str = item?.category.split(' ')
    //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //         .join(' ');
    //     return { option: str, value: item?.category }
    // })


    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['product', page, limit, sortBy, sortOrder, search, minPrice, maxPrice, category],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/product`, {
                params: { page, limit, sortBy, sortOrder, search, minPrice, maxPrice, category }
            });
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const isDelete = confirm('Do You want to Delete Product')
        if (isDelete) {

            const res = await axiosNotSecure.delete(`/productDelete/${id}`);
            if (res) {
                toast.success('Product Deleted Successfully ')
                refetch();
            }
        }


    };

    const handleEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`);
        console.log(`Edit product with id: ${id}`);
    };

    const togglePublished = async (id) => {
        const res = await axiosNotSecure.patch(`/productIsAcitve/${id}`);
        if (res) {

            refetch();
        }
    };

    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);

    useEffect(() => {
        refetch();
    }, [page, limit, sortBy, sortOrder, search, minPrice, maxPrice, category]);

    // if (isLoading) {
    //     return <div>Loading.....</div>;
    // }

    return (
        <div className="container mx-auto p-6 bg-white text-black shadow-lg min-h-screen rounded-md">
            <Toaster />
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Products</h2>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    className="border px-4 py-2 rounded"
                />
                <div>
                    <label className="mr-2">Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border px-4 py-2 rounded mr-2">
                        <option value="date">Date</option>
                        <option value="price">Price</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border px-4 py-2 rounded">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="border px-4 py-2 rounded mr-2"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="border px-4 py-2 rounded mr-2"
                />
                <select value={category} onChange={handleCategoryChange} className="border px-4 py-2 rounded">
                    <option value="">All Categories</option>
                    {categoryOptions?.map((cat) => (
                        <option key={cat} value={cat.option}>
                            {cat.option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto mt-10 ">
                <table className="min-w-full  bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Published</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <div> */}
                        {
                            isLoading ? <div>Loading</div>
                                :
                                products?.data?.map(product => (
                                    <tr key={product._id}>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">${product.price.toFixed(2)}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.category}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <Switch
                                                checked={product.status === 'active'}
                                                onChange={() => togglePublished(product._id)}
                                                className={`${product.status === 'active' ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                                            >
                                                <span className="sr-only">Publish Toggle</span>
                                                <span
                                                    className={`${product.status === 'active' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                                />
                                            </Switch>
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <p className={`text-sm ${product.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                                {product.status === 'active' ? 'Published' : 'Unpublished'}
                                            </p>
                                        </td>
                                        <td className="py-[16px] px-4 flex border-b border-gray-200">
                                            <button onClick={() => handleEdit(product._id)} className="mr-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200">Edit</button>
                                            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-200">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        {/* </div> */}
                    </tbody>
                </table>
                <div className="flex justify-between items-end  mt-4 gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className="bg-gray-300 text-gray-700 py-1 px-2 rounded"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">Page {page}</span>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            className="bg-gray-300 text-gray-700 py-1 px-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(parseInt(e.target.value))}
                        className="border px-4 py-2 rounded"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

            </div>
        </div >
    );
};

export default ManageProducts;
