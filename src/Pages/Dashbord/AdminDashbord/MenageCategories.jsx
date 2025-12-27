import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { cloudinaryUpload } from "../../../utils/cloudinary";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  Edit3,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Package,
  FileText,
  Save,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye
} from "lucide-react";

const ManageCategories = () => {
  const { axiosNotSecure } = useAxiosNotSecure();
  const [categoriesName, setCategoriesName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [haveImage, setHaveImage] = useState(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewImageModal, setViewImageModal] = useState(null);

  const {
    data: categoriesData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosNotSecure.get(`/category`);
      return res.data;
    },
  });

  const openModal = (data) => {
    setImageUrl(data.image);
    setCategoriesName(data.category);
    setDescription(data.description);
    setEditData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setImageUrl("");
    setCategoriesName("");
    setDescription("");
    setEditData({});
    setHaveImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    try {
      const data = {
        image: imageUrl,
        category: categoriesName,
        description: description,
      };

      if (!imageUrl) {
        const imageFile = e.target.image.files[0];
        const res = await cloudinaryUpload(imageFile);
        const image = res.secure_url;
        data.image = image;
        data.oldImageUrl = editData.image;
      }

      await axiosNotSecure.patch(`/category/${editData._id}`, data);
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosNotSecure.delete(`/category/${deleteId}`);
      refetch();
      setIsDeleteOpen(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedData = categoriesData
    ?.filter((cat) =>
      cat.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = sortBy === "name" ? a.category : a.description;
      let bVal = sortBy === "name" ? b.category : b.description;
      
      if (sortOrder === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Manage Categories
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                View and manage all product categories
              </p>
            </div>
          </div>

          {/* Stats Badge */}
          <div className="bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {categoriesData?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="description">Sort by Description</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === "asc" ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : filteredAndSortedData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Folder className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No categories found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm ? "Try adjusting your search" : "Categories will appear here once added"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Image
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Category Name
                      {sortBy === "name" && (
                        sortOrder === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">
                    <button
                      onClick={() => handleSort("description")}
                      className="flex items-center gap-2 font-semibold text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Description
                      {sortBy === "description" && (
                        sortOrder === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-700">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAndSortedData?.map((category, index) => (
                    <motion.tr
                      key={category._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-purple-50/30 transition-colors group"
                    >
                      {/* Image */}
                      <td className="px-6 py-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 group-hover:ring-2 group-hover:ring-purple-500 transition-all cursor-pointer"
                          onClick={() => setViewImageModal(category.image)}
                        >
                          <img
                            src={category.image}
                            alt={category.category}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </td>

                      {/* Category Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-100">
                            <Package className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 capitalize">
                              {category.category}
                            </p>
                            <p className="text-xs text-gray-500 md:hidden line-clamp-1">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-gray-600 text-sm line-clamp-2 max-w-md">
                          {category.description}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModal(category)}
                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setDeleteId(category._id);
                              setIsDeleteOpen(true);
                            }}
                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        {filteredAndSortedData?.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredAndSortedData.length}</span> of{" "}
              <span className="font-semibold">{categoriesData.length}</span> categories
            </p>
          </div>
        )}
      </motion.div>

      {/* Image View Modal */}
      <Transition appear show={!!viewImageModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setViewImageModal(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 shadow-2xl transition-all">
                  <button
                    onClick={() => setViewImageModal(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/90 hover:bg-white transition-colors z-10"
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </button>
                  <img
                    src={viewImageModal}
                    alt="Category"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                  {/* Modal Header */}
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-5">
                    <Dialog.Title className="text-2xl font-bold text-white flex items-center gap-2">
                      <Edit3 className="w-6 h-6" />
                      Edit Category
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="absolute top-5 right-6 p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                      {/* Category Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Package className="w-4 h-4 text-purple-600" />
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={categoriesName}
                          onChange={(e) => setCategoriesName(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-800"
                          placeholder="Enter category name"
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-800 resize-none"
                          placeholder="Enter category description"
                          required
                        />
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <ImageIcon className="w-4 h-4 text-purple-600" />
                          Category Image
                        </label>

                        {imageUrl ? (
                          <div className="relative">
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                              <img
                                src={imageUrl}
                                alt="Category"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setImageUrl("")}
                              className="absolute top-2 right-2 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors duration-200"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="relative">
                              <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={(e) => setHaveImage(e.target.value)}
                                className="hidden"
                                accept="image/*"
                              />
                              <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                              >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-600">
                                  Click to upload new image
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                  PNG, JPG up to 5MB
                                </span>
                              </label>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setImageUrl(editData.image);
                                setHaveImage(null);
                              }}
                              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                            >
                              Keep Current Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8">
                      <motion.button
                        type="submit"
                        disabled={isButtonLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isButtonLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Update Category
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={closeModal}
                        disabled={isButtonLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsDeleteOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
                    Delete Category?
                  </Dialog.Title>
                  <p className="text-gray-600 mb-6">
                    This action cannot be undone. This will permanently delete the
                    category from your database.
                  </p>

                  <div className="flex gap-3 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsDeleteOpen(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDelete}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </motion.button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManageCategories;