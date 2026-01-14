import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { cloudinaryUpload, cloudinaryUploadMultiple } from '../../../utils/cloudinary';
import { useQuery } from '@tanstack/react-query';
import useAxiosNotSecure from '../../../Hooks/useAxiosNotSecure';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom';
import { HiMiniXCircle } from 'react-icons/hi2';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const EditProduct = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [flavour, setFlavour] = useState([''])
    const [nicotine, setNicotine] = useState([''])
    const { axiosNotSecure } = useAxiosNotSecure();
    const { register, handleSubmit, setValue, formState: { errors }, control, reset } = useForm();
    const [content, setContent] = useState('');


    // Fetch categories and nicotine options
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
    const [imageUrl, setImageUrl] = useState('')
    const [isImageChange, setIsImageChange] = useState(false)
    const [isImagesChange, setIsImagesChange] = useState(false)
    const [imagesUrl, setImagesUrl] = useState([])
    // const [haveImage, setHaveImage] = useState(false)
    useEffect(() => {
        if (productData && productData.image) {
            setImageUrl(productData.image);
        }
        setFlavour(productData?.flavour || [''])
        setNicotine(productData?.nicotineStrength || [''])
    }, [productData, setImageUrl, setFlavour]);
    useEffect(() => {
        if (productData && productData.images) {
            setImagesUrl(productData.images);
        }
    }, [productData, setImagesUrl]);
    useEffect(() => {
        if (productData?.category) {
            setValue("category", productData.category);
        }
    }, [productData, setValue]);

    const categoryOptions = categoriesData.map(item => {
        const str = item?.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return { option: str, value: item?.category };
    });



    // Set default values from product data when it's fetched
    useEffect(() => {
        if (productData) {
            reset({
                ...productData,
                nicotineStrength: productData.nicotineStrength.map(value => ({ value, label: value })),
                category: productData.category,
                description: productData.description,
            });
            setContent(productData.description);
            setValue('category', productData.category); // Set the default category
            setValue('status', productData.status); // Set the default status
        }
    }, [productData, reset]);

    const onSubmit = async (data) => {
        const { image, images, nicotineStrength, price, discount_price } = data;
        const imageFile = image[0]; // Getting the first file as image is a FileList
        const toastId = toast.loading('loading...')
        try {
            setIsLoading(true);
            if (isImageChange) {
                const imageResponse = await cloudinaryUpload(imageFile);
                data.image = imageResponse.secure_url;
                data.oldImage = imageUrl
            }
            else {
                data.image = imageUrl
            }
            if (isImagesChange) {
                const galleryFiles = Array.from(images || []);
                const galleryResponses = await cloudinaryUploadMultiple(galleryFiles);
                data.images = galleryResponses.map(response => response.secure_url);
                data.oldImages = imagesUrl
            }
            else {
                data.images = imagesUrl
            }
            data.price = parseInt(price);
            data.discount_price = parseInt(discount_price);

            data.nicotineStrength = nicotine
            data.flavour = flavour;
            // data.nicotineStrength = nicotineStrength.map(n => n.value);
            data.description = content;
            // Add your form submission logic here (edit the product)
            const res = await axiosNotSecure.patch(`/product/${id}`, data);
            if (res) {
                setIsLoading(false);
                setIsImageChange(false)
                setIsImagesChange(false)
                toast.success("product update successfully", { id: toastId })
                refetch()
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating product:', error);
            toast.error(error.message, { id: toastId })
        }

    };

    const handleAddFlavour = () => {
        setFlavour((prev) => [...prev, ""]);
    };
    const handleAddNicotine = () => {
        setNicotine((prev) => [...prev, ""]);
    };

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg md:max-w-5xl mx-auto p-6 text-black bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Vape Product</h2>

            {/* Product Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Product Name</label>
                <input
                    id="name"
                    {...register('name', { required: 'Product Name is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Product Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Product Description</label>
                <JoditEditor
                    value={content}
                    tabIndex={6}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Image */}
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
                {
                    !isImageChange ? (
                        <div className='relative'>
                            <img src={imageUrl} className="size-20" alt="" />
                            <span onClick={() => {
                                setIsImageChange(true)
                            }
                            } className="absolute text-black -top-1 left-16 rounded-full  "><HiMiniXCircle size={20} /></span>
                        </div>
                    )
                        :
                        <div>
                            <input
                                id="image"
                                type="file"
                                {...register('image', { required: 'Image is required' })}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button onClick={() => {
                                setImageUrl(productData?.image)
                                setIsImageChange(false)
                            }} className="bg-red-500 text-white p-1 rounded-md">Dont Change</button>
                            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                        </div>
                }

            </div>

            {/* Gallery Images */}
            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">
                    Gallery Images
                </label>
                {!isImagesChange ? (
                    <div className="flex gap-2 relative">
                        {imagesUrl?.map((item, index) => (
                            <div key={index} className="">
                                <img src={item} className="w-20 h-20 object-cover rounded" alt={`Gallery ${index + 1}`} />

                            </div>
                        ))}
                        <span
                            onClick={() => {
                                // const updatedImages = productData.images.filter((_, i) => i !== index);
                                setIsImagesChange(true); // Clear imageUrl (optional if you're managing it globally)
                                // Update productData or imagesUrl based on your state structure
                            }}
                            className=" text-black bg-white rounded-full cursor-pointer p-1"
                        >
                            <HiMiniXCircle size={20} />
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            id="images"
                            multiple
                            type="file"
                            {...register('images', { required: 'Images are required' })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => {
                                setImagesUrl(productData?.images)
                                setIsImagesChange(false)
                            }}
                            type="button"
                            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Don't Change
                        </button>
                        {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
                    </div>
                )}
            </div>

            {/* Price */}
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                <input
                    type="number"
                    id="price"
                    {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be greater than 1' } })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="discount_price" className="block text-gray-700 font-semibold mb-2">Discount Price in %</label>
                <input
                    type="number"
                    id="discount_price"
                    {...register('discount_price', { required: 'Discount Price is required', min: { value: 1, message: 'Price must be greater then 1 ' } })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.discount_price && <p className="text-red-500 text-sm">{errors.discount_price.message}</p>}
            </div>

            {/* Category */}
            {/* Category */}
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                    id="category"
                    {...register('category', { required: 'Category is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    {categoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.option}
                        </option>
                    ))}
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
                        {flavour?.map((item, idx) => (
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

            {/* Status */}
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Status</label>
                <select
                    id="status"
                    defaultValue={productData?.status}
                    {...register('status', { required: 'Status is required' })}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : 'Update Product'}
                </button>
            </div>
        </form >
    );
};

export default EditProduct;
