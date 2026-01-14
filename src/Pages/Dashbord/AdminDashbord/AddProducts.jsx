import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { cloudinaryUpload, cloudinaryUploadMultiple } from '../../../utils/cloudinary';
import { useQuery } from '@tanstack/react-query';
import useAxiosNotSecure from '../../../Hooks/useAxiosNotSecure';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import JoditEditor from "jodit-pro-react";
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const AddProducts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [flavour, setFlavour] = useState([''])
    const [nicotine, setNicotine] = useState([''])
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const { axiosNotSecure } = useAxiosNotSecure()
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();

    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category',],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/category`);
            return res.data;
        },
    });
    const categoryOptions = categoriesData.map(item => {
        const str = item?.category.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return { option: str, value: item?.category }
    })



    const onSubmit = async (data) => {
        const { image, images, color, nicotineStrength, price, discount_price } = data;
        const imageFile = image[0]; // Getting the first file as image is a FileList
        const galleryFiles = Array.from(images || []);
        const toastId = toast.loading("Loading...")
        try {
            setIsLoading(true)

            const imageResponse = await cloudinaryUpload(imageFile);
            const galleryResponses = await cloudinaryUploadMultiple(galleryFiles);
            data.image = imageResponse.secure_url;
            data.images = galleryResponses.map(response => response.secure_url);
            data.price = parseInt(price);
            data.discount_price = parseInt(discount_price);
            data.nicotineStrength = nicotine;
            data.flavour = flavour;
            data.description = content
            // Add your form submission logic here
            const res = await axiosNotSecure.post('/product', data)
            if (res) {
                reset();
                setContent('')
                setIsLoading(false)
                toast.success('Product Update Successfully', { id: toastId })
            }
        } catch (error) {
            setContent('')
            setIsLoading(false)
            toast.error(error.message, { id: toastId })
            console.error('Error uploading files:', error);
        }
    };
    const handleAddFlavour = () => {
        setFlavour((prev) => [...prev, ""]);
    };
    const handleAddNicotine = () => {
        setNicotine((prev) => [...prev, ""]);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 text-black bg-white shadow-lg rounded-md my-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

            {/* Product Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Product Name</label>
                <input
                    id="name"
                    {...register('name', { required: 'Product Name is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Product Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Product Description</label>
                {/* <textarea
                    id="description"
                    {...register('description', { required: 'Product Description is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={6} // tabIndex of textarea
                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => { }}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Image */}
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
                <input
                    id="image"
                    type="file"
                    {...register('image', { required: 'Image is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            {/* Gallery Images */}
            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">Gallery Images</label>
                <input
                    id="images"
                    multiple
                    type="file"
                    {...register('images', { required: 'Gallery Images are required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                <input
                    type="number"
                    id="price"
                    {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be greater then 1 ' } })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            {/* discount_price */}
            <div className="mb-4">
                <label htmlFor="discount_price" className="block text-gray-700 font-semibold mb-2">Discount Price in %</label>
                <input
                    type="number"
                    id="discount_price"
                    {...register('discount_price', { min: { value: 1, message: 'Discount must be greater then 1 ' }, max: { value: 100, message: "" } })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.discount_price && <p className="text-red-500 text-sm">{errors.discount_price.message}</p>}
            </div>

            {/* Category */}
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                    id="category"
                    {...register('category', { required: 'Category is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {
                        categoryOptions.map((item, index) => <option key={index} value={item.option}>{item.option}</option>)
                    }
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            {/* Nicotine Strength */}
            <div className="mb-4">
                <label htmlFor="nicotineStrength" className="block text-gray-700 font-semibold mb-2">Flavour</label>
                <div>
                    <div>
                        <button
                            type="button"
                            onClick={handleAddFlavour}
                            className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer"
                        >
                            Add <FaPlus />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {flavour.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const updated = [...flavour];
                                        updated[idx] = e.target.value;
                                        setFlavour(updated);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder={`Flavour ${idx + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = flavour.filter((_, i) => i !== idx);
                                        setFlavour(updated.length ? updated : []);
                                    }}
                                    className="text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {errors.nicotineStrength && (
                    <p className="text-red-500 text-sm">{errors.nicotineStrength.message}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="nicotineStrength" className="block text-gray-700 font-semibold mb-2">Nicotine Strength</label>
                <div>
                    <div>
                        <button
                            type="button"
                            onClick={handleAddNicotine}
                            className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer"
                        >
                            Add <FaPlus />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {nicotine.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                        const updated = [...flavour];
                                        updated[idx] = e.target.value;
                                        setNicotine(updated);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder={`Nicotine ${idx + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = nicotine.filter((_, i) => i !== idx);
                                        setNicotine(updated.length ? updated : []);
                                    }}
                                    className="text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {errors.nicotineStrength && (
                    <p className="text-red-500 text-sm">{errors.nicotineStrength.message}</p>
                )}
            </div>

            {/* ------------------------------- Brand */}
            {/* <div className="mb-4">
                <label htmlFor="brand" className="block text-gray-700 font-semibold mb-2">Brand</label>
                <input
                    type="text"
                    id="brand"
                    {...register('brand', { required: 'Brand is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
            </div> */}

            {/* -------------------------------Flavor */}
            {/* <div className="mb-4">
                <label htmlFor="flavor" className="block text-gray-700 font-semibold mb-2">Flavor</label>
                <input
                    type="text"
                    id="flavor"
                    {...register('flavor', { required: 'Flavor is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.flavor && <p className="text-red-500 text-sm">{errors.flavor.message}</p>}
            </div> */}

            {/* Rating */}
            {/* <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">Rating</label>
                <input
                    type="number"
                    id="rating"
                    {...register('rating', {
                        min: { value: 0, message: 'Rating must be at least 0' },
                        max: { value: 5, message: 'Rating must be at most 5' }
                    })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
            </div> */}

            {/* Status */}
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <button
                type="submit"
                className={`w-full py-3 mt-4 bg-primaryColor text-white font-semibold rounded hover:bg-secondaryColor transition duration-200 flex justify-center items-center ${isLoading ? 'cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Add Product'}
            </button>
        </form>
    );
};

export default AddProducts;
