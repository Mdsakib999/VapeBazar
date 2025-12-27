import { useForm } from "react-hook-form";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FolderPlus,
    Upload,
    Image as ImageIcon,
    FileText,
    Loader2,
    Save,
    X,
    CheckCircle,
    Package,
    AlertCircle,
    Tag,
    Sparkles
} from "lucide-react";

const AddCategories = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { axiosNotSecure } = useAxiosNotSecure();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        setUploadSuccess(false);
        try {
            data.category = data.category.toLowerCase();
            const imageResponse = await cloudinaryUpload(imageFile);
            
            if (imageResponse) {
                data.image = imageResponse.secure_url;
                const res = await axiosNotSecure.post('/category', data);
                
                if (res) {
                    setUploadSuccess(true);
                    setTimeout(() => {
                        reset();
                        setImagePreview(null);
                        setImageFile(null);
                        setUploadSuccess(false);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearImage = () => {
        setImagePreview(null);
        setImageFile(null);
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 p-4 md:p-8">
            {/* Success Toast */}
            <AnimatePresence>
                {uploadSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-bold">Success!</p>
                            <p className="text-sm">Category added successfully</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl">
                            <FolderPlus className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                        Add New Category
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Create a new product category to organize your inventory
                    </p>
                        </div>
                    </div>
                    
                </motion.div>

                {/* Main Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header Banner */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-8">
                           
                            <div className="relative z-10">
                                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                    <Sparkles className="w-7 h-7" />
                                    Category Details
                                </h2>
                                <p className="text-white/90 mt-2">Fill in the information below</p>
                            </div>
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Form Fields */}
                                <div className="space-y-6">
                                    {/* Category Name */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <div className="p-1.5 rounded-lg bg-purple-100">
                                                <Tag className="w-4 h-4 text-purple-600" />
                                            </div>
                                            Category Name
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("category", {
                                                required: "Category name is required",
                                                maxLength: {
                                                    value: 50,
                                                    message: "Category name cannot exceed 50 characters"
                                                }
                                            })}
                                            type="text"
                                            placeholder="e.g., Disposables, Pods, E-liquids"
                                            className={`w-full px-5 py-4 rounded-xl border-2 bg-gray-50/50 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium ${
                                                errors.category
                                                    ? 'border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.category && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex items-center gap-2 text-red-600 text-sm mt-2 font-medium"
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.category.message}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <div className="p-1.5 rounded-lg bg-purple-100">
                                                <FileText className="w-4 h-4 text-purple-600" />
                                            </div>
                                            Description
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            {...register("description", {
                                                required: "Description is required",
                                                maxLength: {
                                                    value: 500,
                                                    message: "Description cannot exceed 500 characters"
                                                }
                                            })}
                                            rows={6}
                                            placeholder="Describe what products belong in this category..."
                                            className={`w-full px-5 py-4 rounded-xl border-2 bg-gray-50/50 focus:bg-white outline-none transition-all duration-200 text-gray-800 font-medium resize-none ${
                                                errors.description
                                                    ? 'border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100'
                                            }`}
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <AnimatePresence>
                                                {errors.description && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2 text-red-600 text-sm font-medium"
                                                    >
                                                        <AlertCircle className="w-4 h-4" />
                                                        {errors.description.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                            {!errors.description && (
                                                <span className="text-xs text-gray-500 font-medium ml-auto">
                                                    {watch("description")?.length || 0}/500
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Column - Image Upload */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                        <div className="p-1.5 rounded-lg bg-purple-100">
                                            <ImageIcon className="w-4 h-4 text-purple-600" />
                                        </div>
                                        Category Image
                                        <span className="text-red-500">*</span>
                                    </label>

                                    {imagePreview ? (
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="relative group"
                                        >
                                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-purple-200 shadow-xl">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={clearImage}
                                                className="absolute top-3 right-3 p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-2xl transition-all duration-200 hover:scale-110"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg">
                                                <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    Image Ready
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div>
                                            <input
                                                {...register("image", {
                                                    required: "Category image is required"
                                                })}
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="image"
                                                className={`flex flex-col items-center justify-center w-full aspect-square border-3 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                                                    errors.image
                                                        ? 'border-red-400 bg-red-50 hover:bg-red-100'
                                                        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-purple-50/50 hover:border-purple-500 hover:from-purple-50 hover:to-pink-50'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center justify-center py-8 px-4">
                                                    <motion.div
                                                        animate={{
                                                            y: [0, -10, 0],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }}
                                                        className={`p-6 rounded-full mb-4 ${
                                                            errors.image ? 'bg-red-100' : 'bg-purple-100'
                                                        }`}
                                                    >
                                                        <Upload className={`w-10 h-10 ${
                                                            errors.image ? 'text-red-600' : 'text-purple-600'
                                                        }`} />
                                                    </motion.div>
                                                    <p className={`text-base font-bold mb-2 ${
                                                        errors.image ? 'text-red-600' : 'text-gray-800'
                                                    }`}>
                                                        Click to upload image
                                                    </p>
                                                    <p className="text-sm text-gray-500 text-center">
                                                        PNG, JPG, WEBP up to 5MB
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        Recommended: 800x800px
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                    <AnimatePresence>
                                        {errors.image && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="flex items-center gap-2 text-red-600 text-sm font-medium"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.image.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t-2 border-gray-100"
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Creating Category...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-6 h-6" />
                                            Add Category
                                        </>
                                    )}
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        clearImage();
                                    }}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="sm:w-auto px-8 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-lg"
                                >
                                    Reset
                                </motion.button>
                            </motion.div>
                        </div>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default AddCategories;