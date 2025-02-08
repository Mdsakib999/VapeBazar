import { useForm } from "react-hook-form";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const AddCategories = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const { axiosNotSecure } = useAxiosNotSecure()
    const onSubmit = async (data) => {
        setIsLoading(true)
        const { image } = data
        const imageFile = image[0];
        data.category = data.category.toLowerCase()
        const imageResponse = await cloudinaryUpload(imageFile);
        if (imageResponse) {
            data.image = imageResponse.secure_url
            const res = await axiosNotSecure.post('/category', data)
            if (res) {
                setIsLoading(false)
                reset();
            }
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-black text-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4  text-center ">Add Category</h2>

                {/* Category Name */}
                <div className="mb-4 ">
                    <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="category">
                        Category Name
                    </label>
                    <input
                        {...register("category", { required: "Category name is required", maxLength: { value: 50, message: "Category name cannot exceed 50 characters" } })}
                        id="category"
                        type="text"
                        placeholder="Enter category name"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${errors.category ? 'border-red-500' : ''}`}
                    />
                    {errors.category && (
                        <p className="text-red-500 text-xs italic">{errors.category.message}</p>
                    )}
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        {...register("image", { required: "Image URL is required", })}
                        id="image"
                        type="file"
                        placeholder="Enter image URL"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-xs italic">{errors.image.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        {...register("description", { required: "Description is required", maxLength: { value: 500, message: "Description cannot exceed 500 characters" } })}
                        id="description"
                        placeholder="Enter description"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-xs italic">{errors.description.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`w-full py-3 mt-4 bg-primaryColor text-white font-semibold rounded hover:bg-secondaryColor transition duration-200 flex justify-center items-center ${isLoading ? 'cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Add Category'}
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AddCategories;