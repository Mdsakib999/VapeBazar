import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { cloudinaryUpload, cloudinaryUploadMultiple } from '../../../utils/cloudinary';
import { useQuery } from '@tanstack/react-query';
import useAxiosNotSecure from '../../../Hooks/useAxiosNotSecure';
import { FaPlus } from 'react-icons/fa';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Image as ImageIcon,
    FileText,
    DollarSign,
    Tag,
    Loader2,
    Save,
    X,
    Upload,
    Trash2,
    CheckCircle,
    AlertCircle,
    Sparkles,
    Edit3,
    Plus
} from 'lucide-react';

const EditProduct = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flavour, setFlavour] = useState(['']);
    const [nicotine, setNicotine] = useState(['']);
    const { axiosNotSecure } = useAxiosNotSecure();
    const { register, handleSubmit, setValue, formState: { errors }, control, reset } = useForm();
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isImageChange, setIsImageChange] = useState(false);
    const [isImagesChange, setIsImagesChange] = useState(false);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosNotSecure.get('/category');
            return res.data;
        },
    });

    const { data: productData, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/product/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (productData && productData.image) {
            setImageUrl(productData.image);
        }
        setFlavour(productData?.flavour || ['']);
        setNicotine(productData?.nicotineStrength || ['']);
    }, [productData]);

    useEffect(() => {
        if (productData && productData.images) {
            setImagesUrl(productData.images);
        }
    }, [productData]);

    useEffect(() => {
        if (productData?.category) {
            setValue("category", productData.category);
        }
    }, [productData, setValue]);

    const categoryOptions = categoriesData.map(item => {
        const str = item?.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return { option: str, value: item?.category };
    });

    useEffect(() => {
        if (productData) {
            reset({
                ...productData,
                nicotineStrength: productData.nicotineStrength.map(value => ({ value, label: value })),
                category: productData.category,
                description: productData.description,
            });
            setContent(productData.description);
            setValue('category', productData.category);
            setValue('status', productData.status);
        }
    }, [productData, reset]);

    const onSubmit = async (data) => {
        const { image, images, nicotineStrength, price, discount_price } = data;
        const imageFile = image[0];
        // const toastId = toast.loading('Updating product...');

        try {
            setIsLoading(true);

            if (isImageChange) {
                const imageResponse = await cloudinaryUpload(imageFile);
                data.image = imageResponse.secure_url;
                data.oldImage = imageUrl;
            } else {
                data.image = imageUrl;
            }

            if (isImagesChange) {
                const galleryFiles = Array.from(images || []);
                const galleryResponses = await cloudinaryUploadMultiple(galleryFiles);
                data.images = galleryResponses.map(response => response.secure_url);
                data.oldImages = imagesUrl;
            } else {
                data.images = imagesUrl;
            }

            data.price = parseInt(price);
            data.discount_price = parseInt(discount_price);
            data.nicotineStrength = nicotine;
            data.flavour = flavour;
            data.description = content;

            const res = await axiosNotSecure.patch(`/product/${id}`, data);

            if (res) {
                setIsLoading(false);
                setIsImageChange(false);
                setIsImagesChange(false);
                setUpdateSuccess(true);
                // toast.success("Product updated successfully!", { id: toastId });
                refetch();

                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 2000);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating product:', error);
            toast.error(error.message);
        }
    };

    const handleAddFlavour = () => {
        setFlavour((prev) => [...prev, ""]);
    };

    const handleAddNicotine = () => {
        setNicotine((prev) => [...prev, ""]);
    };

    if (!productData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4 md:p-8">
            <Toaster position="top-center" richColors />

            {/* Success Toast */}
            <AnimatePresence>
                {updateSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-bold">Success!</p>
                            <p className="text-sm">Product updated successfully</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-400 shadow-xl">
                            <Edit3 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                                Edit Product
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Update product information and details
                            </p>
                        </div>
                    </div>

                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}


                        <div className="p-8 md:p-10 space-y-8">
                            {/* Product Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <Package className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Product Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', { required: 'Product Name is required' })}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                    placeholder="Enter product name"
                                />
                                {errors.name && (
                                    <p className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </motion.div>

                            {/* Price & Discount */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <DollarSign className="w-4 h-4 text-blue-600" />
                                        </div>
                                        Discount Price
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be greater than 1' } })}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                        placeholder="0.00"
                                    />
                                    {errors.price && (
                                        <p className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.price.message}
                                        </p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <Tag className="w-4 h-4 text-blue-600" />
                                        </div>
                                         Regular Price
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register('discount_price',)}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                        placeholder="0"
                                    />
                                    {errors.discount_price && (
                                        <p className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.discount_price.message}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <Tag className="w-4 h-4 text-blue-600" />
                                        </div>
                                        Category
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('category', { required: 'Category is required' })}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 font-medium capitalize"
                                    >
                                        <option value="">Select a category</option>
                                        {categoryOptions.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.category.message}
                                        </p>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <CheckCircle className="w-4 h-4 text-blue-600" />
                                        </div>
                                        Status
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('status', { required: 'Status is required' })}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-800 font-medium"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <p className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.status.message}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <ImageIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Main Product Image
                                    <span className="text-red-500">*</span>
                                </label>

                                {!isImageChange ? (
                                    <div className="relative inline-block">
                                        <img src={imageUrl} className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200" alt="Product" />
                                        <button
                                            type="button"
                                            onClick={() => setIsImageChange(true)}
                                            className="absolute -top-2 -right-2 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <input
                                            type="file"
                                            {...register('image', { required: 'Image is required' })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                            accept="image/*"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageUrl(productData?.image);
                                                setIsImageChange(false);
                                            }}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                                        >
                                            Keep Current Image
                                        </button>
                                        {errors.image && (
                                            <p className="flex items-center gap-2 text-red-600 text-sm font-medium">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.image.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Gallery Images */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <ImageIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Gallery Images
                                </label>

                                {!isImagesChange ? (
                                    <div className="relative">
                                        <div className="flex gap-3 flex-wrap">
                                            {imagesUrl?.map((item, index) => (
                                                <img key={index} src={item} className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200" alt={`Gallery ${index + 1}`} />
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsImagesChange(true)}
                                            className="mt-3 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Change Images
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <input
                                            type="file"
                                            multiple
                                            {...register('images', { required: 'Images are required' })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                            accept="image/*"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagesUrl(productData?.images);
                                                setIsImagesChange(false);
                                            }}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                                        >
                                            Keep Current Images
                                        </button>
                                        {errors.images && (
                                            <p className="flex items-center gap-2 text-red-600 text-sm font-medium">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.images.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Flavours */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <Tag className="w-4 h-4 text-blue-600" />
                                        </div>
                                        Flavours
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddFlavour}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Flavour
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {flavour?.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const updated = [...flavour];
                                                    updated[idx] = e.target.value;
                                                    setFlavour(updated);
                                                }}
                                                className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800"
                                                placeholder={`Flavour ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = flavour.filter((_, i) => i !== idx);
                                                    setFlavour(updated.length ? updated : ['']);
                                                }}
                                                className="p-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Nicotine Strength */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                        <div className="p-1.5 rounded-lg bg-blue-100">
                                            <Tag className="w-4 h-4 text-blue-600" />
                                        </div>
                                        Nicotine Strength
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddNicotine}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Strength
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {nicotine?.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const updated = [...nicotine];
                                                    updated[idx] = e.target.value;
                                                    setNicotine(updated);
                                                }}
                                                className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-800"
                                                placeholder={`Nicotine ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = nicotine.filter((_, i) => i !== idx);
                                                    setNicotine(updated.length ? updated : ['']);
                                                }}
                                                className="p-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Description Editor */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                    <div className="p-1.5 rounded-lg bg-blue-100">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Product Description
                                </label>
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                                    <JoditEditor
                                        value={content}
                                        tabIndex={6}
                                        onBlur={newContent => setContent(newContent)}
                                        onChange={newContent => { }}
                                    />
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                                className="pt-6"
                            >
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Updating Product...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-6 h-6" />
                                            Update Product
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EditProduct;