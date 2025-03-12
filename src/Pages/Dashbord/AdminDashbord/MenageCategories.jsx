import { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { HiMiniXCircle } from "react-icons/hi2";
import { cloudinaryUpload, deleteImage } from "../../../utils/cloudinary";
import { FaSpinner } from "react-icons/fa";

const sampleCategories = [
    { id: 1, name: 'Category 1', description: 'Description 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Category 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/150' },
    // Add more sample categories as needed
];

const ManageCategories = () => {
    const [categories, setCategories] = useState(sampleCategories);
    const { axiosNotSecure } = useAxiosNotSecure()
    const [categoriesName, setCategoriesName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [haveImage, setHaveImage] = useState(null)
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [editData, setEditData] = useState({})
    const [editingCategory, setEditingCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: categoriesData = [], refetch, isLoading } = useQuery({
        queryKey: ['category',],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/category`);
            return res.data;
        },
    });


    const openModal = (data) => {
        setImageUrl(data.image)
        setCategoriesName(data.category)
        setDescription(data.description)
        setEditData(data)
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditingCategory(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsButtonLoading(true)
        const data = { image: imageUrl, category: categoriesName, description: description }
        if (!imageUrl) {
            const imageFile = e.target.image.files[0];
            const res = await cloudinaryUpload(imageFile)
            const image = res.secure_url
            data.image = image
            data.oldImageUrl = editData.image
        }
        const res = await axiosNotSecure.patch(`/category/${editData._id}`, data)
        if (res) {
            refetch()
            closeModal();
            setIsButtonLoading(false)
        }

    }

    const handleDelete = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };
    const handleCancel = () => {
        setHaveImage(null)
        closeModal();
        setImageUrl("")
        setCategoriesName("")
        setDescription("")
    };

    return (
        <div className="container overflow-x-auto mx-auto p-6 bg-white text-black shadow-lg rounded-md h-[100vh]">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Categories</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Image</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Description</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesData.map(category => (
                            <tr key={category._id}>
                                <td className="py-2 px-4 border-b border-gray-200"><img src={category.image} alt={category.category} className="w-12 h-12 object-cover rounded" /></td>
                                <td className="py-2 px-4 border-b border-gray-200">{category.category}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {category.description.split(' ').length > 20
                                        ? `${category.description.split(' ').slice(0, 10).join(' ')}...`
                                        : category.description}
                                </td>

                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button onClick={() => openModal(category)} className="mr-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200">Edit</button>
                                    <button onClick={() => handleDelete(category.id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-200">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {editingCategory ? 'Edit Category' : 'Add Category'}
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="mt-4 text-black">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name</label>
                                                <input
                                                    onChange={(e) => setCategoriesName(e.target.value)}
                                                    defaultValue={categoriesName}
                                                    className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                                <textarea
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    defaultValue={description}
                                                    className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition duration-200"
                                                />
                                            </div>

                                            <div className="relative">
                                                <label className="block text-sm font-medium text-gray-700">Image</label>

                                                {
                                                    imageUrl ? (
                                                        <div>
                                                            <img src={imageUrl} className="size-12" alt="" />
                                                            <span onClick={() => {
                                                                setImageUrl("")
                                                            }
                                                            } className="absolute top-3 left-9 rounded-full cursor-pointer  "><HiMiniXCircle size={20} /></span>
                                                        </div>
                                                    )
                                                        :
                                                        <div>
                                                            <input type="file" onChange={(e) => setHaveImage(e.target.value)} name="image" id="image" />
                                                            <button onClick={() => {
                                                                setImageUrl(editData.image)
                                                                setHaveImage(null)
                                                            }} className="bg-red-500 text-white p-1 rounded-md">Dont Change</button>
                                                        </div>
                                                }
                                            </div>

                                        </div>
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isButtonLoading && 'cursor-not-allowed'}`}
                                                disabled={isButtonLoading}
                                            >
                                                {!isButtonLoading ? 'Update Category' : <FaSpinner className="animate-spin mr-2" />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={isButtonLoading}
                                                className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ManageCategories;
