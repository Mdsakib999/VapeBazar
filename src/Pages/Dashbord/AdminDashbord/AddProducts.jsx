import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { cloudinaryUpload, cloudinaryUploadMultiple } from '../../../utils/cloudinary';
import { useQuery } from '@tanstack/react-query';
import useAxiosNotSecure from '../../../Hooks/useAxiosNotSecure';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import JoditEditor from "jodit-pro-react";
import { toast } from 'sonner';
import { Trash2, Upload, Image as ImageIcon, Package } from 'lucide-react';

const AddProducts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [flavour, setFlavour] = useState([''])
    const [nicotine, setNicotine] = useState([''])
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [galleryPreviews, setGalleryPreviews] = useState([])
    const { axiosNotSecure } = useAxiosNotSecure()
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm();

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });
        Promise.all(previews).then(setGalleryPreviews);
    };

    const handleRemoveGallery = () => {
        setGalleryPreviews([]);
        const fileInput = document.getElementById('images');
        if (fileInput) fileInput.value = '';
    };

    const onSubmit = async (data) => {
        const { image, images, color, nicotineStrength, price, discount_price } = data;
        const imageFile = image[0];
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
            
            const res = await axiosNotSecure.post('/product', data)
            if (res) {
                reset();
                setContent('')
                setImagePreview(null)
                setGalleryPreviews([])
                setFlavour([''])
                setNicotine([''])
                setIsLoading(false)
                toast.success('Product Added Successfully', { id: toastId })
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
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    
                    <h1 className="text-4xl font-bold mb-2">
                        Add New Product
                    </h1>
                    <p className="text-gray-600">Fill in the details below to add a new product to your inventory</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Product Name */}
                                <div className="group">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        {...register('name', { required: 'Product Name is required' })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
                                        placeholder="Enter product name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.name.message}
                                    </p>}
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category"
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a category</option>
                                        {categoryOptions.map((item, index) => (
                                            <option key={index} value={item.option}>{item.option}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.category.message}
                                    </p>}
                                </div>


                                 {/* Price and Discount */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Price <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                            <input
                                                type="number"
                                                id="price"
                                                {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be greater than 1' } })}
                                                className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        {errors.price && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-xs">●</span> {errors.price.message}
                                        </p>}
                                    </div>

                                    <div>
                                        <label htmlFor="discount_price" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Discount %
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                id="discount_price"
                                                {...register('discount_price', { min: { value: 1, message: 'Discount must be greater than 1' }, max: { value: 100, message: "Max 100%" } })}
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">%</span>
                                        </div>
                                        {errors.discount_price && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span className="text-xs">●</span> {errors.discount_price.message}
                                        </p>}
                                    </div>
                                </div>

                                
                                {/* Main Image Upload */}
                                <div className="group">
                                    <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Main Product Image <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="image"
                                            type="file"
                                            {...register('image', { required: 'Image is required' })}
                                            onChange={(e) => {
                                                register('image').onChange(e);
                                                handleImageChange(e);
                                            }}
                                            className="hidden"
                                        />
                                        <label 
                                            htmlFor="image" 
                                            className="flex flex-col items-center justify-center w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 transition-all duration-200 group-hover:shadow-lg relative"
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveImage();
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-12 h-12 text-purple-400 mb-3" />
                                                    <p className="text-sm text-gray-600 font-medium">Click to upload main image</p>
                                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                    {errors.image && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.image.message}
                                    </p>}
                                </div>

                                {/* Gallery Images */}
                                <div className="group">
                                    <label htmlFor="images" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Gallery Images <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="images"
                                            multiple
                                            type="file"
                                            {...register('images', { required: 'Gallery Images are required' })}
                                            onChange={(e) => {
                                                register('images').onChange(e);
                                                handleGalleryChange(e);
                                            }}
                                            className="hidden"
                                        />
                                        <label 
                                            htmlFor="images" 
                                            className="flex flex-col items-center justify-center w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all duration-200 group-hover:shadow-lg relative"
                                        >
                                            {galleryPreviews.length > 0 ? (
                                                <>
                                                    <div className="grid grid-cols-4 gap-2 p-2 w-full h-full">
                                                        {galleryPreviews.map((preview, idx) => (
                                                            <img key={idx} src={preview} alt={`Gallery ${idx}`} className="w-full h-full object-cover rounded-lg" />
                                                        ))}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleRemoveGallery();
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-10 h-10 text-blue-400 mb-2" />
                                                    <p className="text-sm text-gray-600 font-medium">Upload multiple images</p>
                                                    <p className="text-xs text-gray-400 mt-1">Select multiple files</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                    {errors.images && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.images.message}
                                    </p>}
                                </div>

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        {...register('status', { required: 'Status is required' })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.status.message}
                                    </p>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Flavour */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Flavours
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleAddFlavour}
                                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium shadow-sm hover:shadow"
                                        >
                                            <FaPlus className="text-sm" /> Add
                                        </button>
                                    </div>
                                    <div className="space-y-3">
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
                                                    className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-200"
                                                    placeholder={`Flavour ${idx + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = flavour.filter((_, i) => i !== idx);
                                                        setFlavour(updated.length ? updated : ['']);
                                                    }}
                                                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Nicotine Strength */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Nicotine Strength
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleAddNicotine}
                                            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-sm hover:shadow"
                                        >
                                            <FaPlus className="text-sm" /> Add
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {nicotine.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const updated = [...nicotine];
                                                        updated[idx] = e.target.value;
                                                        setNicotine(updated);
                                                    }}
                                                    className="flex-1 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-200"
                                                    placeholder={`Nicotine ${idx + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = nicotine.filter((_, i) => i !== idx);
                                                        setNicotine(updated.length ? updated : ['']);
                                                    }}
                                                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Product Description
                                    </label>
                                    <div className="rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-purple-500 transition-all duration-200">
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            tabIndex={6}
                                            onBlur={newContent => setContent(newContent)}
                                            onChange={newContent => { }}
                                        />
                                    </div>
                                    {errors.description && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                        <span className="text-xs">●</span> {errors.description.message}
                                    </p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="px-8 md:px-12 pb-8 md:pb-12">
                        <button
                            type="submit"
                            className={`w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex justify-center items-center text-lg relative overflow-hidden group ${isLoading ? 'cursor-not-allowed opacity-75' : 'hover:scale-[1.02]'}`}
                            disabled={isLoading}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                            <span className="relative flex items-center gap-3">
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin text-xl" />
                                        Adding Product...
                                    </>
                                ) : (
                                    <>
                                        <Package className="w-5 h-5" />
                                        Add Product
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;