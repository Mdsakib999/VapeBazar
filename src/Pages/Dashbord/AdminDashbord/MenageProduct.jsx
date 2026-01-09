import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Edit3,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ManageProducts = () => {
  const navigate = useNavigate();
  const { axiosNotSecure } = useAxiosNotSecure();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewImageModal, setViewImageModal] = useState(null);

  const { data: categoriesData = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axiosNotSecure.get(`/category`);
      return res.data;
    },
  });

  const categoryOptions = categoriesData.map((item) => ({
    option: item.category,
  }));

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["product", page, limit, sortBy, sortOrder, search, category],
    queryFn: async () => {
      const res = await axiosNotSecure.get(`/product`, {
        params: { page, limit, sortBy, sortOrder, search, category },
      });
      return res.data;
    },
  });

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      const res = await axiosNotSecure.delete(
        `/productDelete/${selectedProduct._id}`
      );
      if (res) {
        toast.success("Product deleted successfully!");
        refetch();
        setDeleteModalOpen(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/admin/edit_product/${id}`);
  };

  const togglePublished = async () => {
    if (!selectedProduct) return;

    try {
      const res = await axiosNotSecure.patch(
        `/productIsAcitve/${selectedProduct._id}`
      );
      if (res) {
        toast.success(
          `Product ${
            selectedProduct.status === "active" ? "unpublished" : "published"
          } successfully!`
        );
        refetch();
        setPublishModalOpen(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      toast.error("Failed to update product status");
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    refetch();
  }, [page, limit, sortBy, sortOrder, search, category]);

  const totalPages = products?.totalPages || 1;
  const currentProducts = products?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-4 md:p-6 lg:p-8">
      <Toaster position="top-center" richColors />

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
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Manage Products
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                View and manage all products
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
                <p className="text-xs text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-800 text-center">
                  {currentProducts?.length || 0}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={handleCategoryChange}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white capitalize"
            >
              <option value="">All Categories</option>
              {categoryOptions?.map((cat, idx) => (
                <option key={idx} value={cat.option} className="capitalize">
                  {cat.option}
                </option>
              ))}
            </select>

            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
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
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
          </div>
        ) : currentProducts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No products found
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {search || category
                ? "Try adjusting your filters"
                : "Products will appear here once added"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left">
                      <span className="font-semibold text-gray-700">Image</span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="font-semibold text-gray-700">
                        Product Name
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("price")}
                        className="flex items-center gap-2 font-semibold text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        Price
                        {sortBy === "price" &&
                          (sortOrder === "asc" ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left hidden lg:table-cell">
                      <span className="font-semibold text-gray-700">
                        Category
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-700">
                        Status
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-700">
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {currentProducts?.map((product, index) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group"
                      >
                        {/* Image */}
                        <td className="px-6 py-4">
                          <div
                            className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 cursor-pointer group-hover:ring-2 group-hover:ring-purple-500 transition-all"
                            onClick={() => setViewImageModal(product.image)}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </td>

                        {/* Product Name */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800 line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500 lg:hidden capitalize">
                              {product.category}
                            </p>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800">
                            Dhs {product.price.toFixed(2)}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                            {product.category}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center gap-2">
                            <Switch
                              checked={product.status === "active"}
                              onChange={() => {
                                setSelectedProduct(product);
                                setPublishModalOpen(true);
                              }}
                              className={`${
                                product.status === "active"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                product.status === "active"
                                  ? "focus:ring-green-500"
                                  : "focus:ring-gray-300"
                              }`}
                            >
                              <span
                                className={`${
                                  product.status === "active"
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                              />
                            </Switch>
                            <span
                              className={`text-xs font-semibold ${
                                product.status === "active"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {product.status === "active"
                                ? "Published"
                                : "Unpublished"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(product._id)}
                              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedProduct(product);
                                setDeleteModalOpen(true);
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

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </motion.button>

                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Image View Modal */}
      <Transition appear show={!!viewImageModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setViewImageModal(null)}
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
                    <XCircle className="w-6 h-6 text-gray-700" />
                  </button>
                  <img
                    src={viewImageModal}
                    alt="Product"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Publish/Unpublish Confirmation Modal */}
      <Transition appear show={publishModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setPublishModalOpen(false)}
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
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      selectedProduct?.status === "active"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    {selectedProduct?.status === "active" ? (
                      <XCircle className="w-8 h-8 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedProduct?.status === "active"
                      ? "Unpublish Product?"
                      : "Publish Product?"}
                  </Dialog.Title>

                  {selectedProduct && (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4 max-w-full">
                      <p className="font-semibold text-gray-800 truncate">
                        {selectedProduct.name}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-600 mb-6">
                    {selectedProduct?.status === "active"
                      ? "This product will be hidden from customers."
                      : "This product will be visible to customers."}
                  </p>

                  <div className="flex gap-3 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPublishModalOpen(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={togglePublished}
                      className={`flex-1 px-4 py-3 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                        selectedProduct?.status === "active"
                          ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {selectedProduct?.status === "active" ? (
                        <>
                          <XCircle className="w-5 h-5" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Publish
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={deleteModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setDeleteModalOpen(false)}
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
                    Delete Product?
                  </Dialog.Title>

                  {selectedProduct && (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 mb-4 max-w-full">
                      <p className="font-semibold text-gray-800 truncate">
                        {selectedProduct.name}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-600 mb-6">
                    This action cannot be undone. This will permanently delete
                    the product from your database.
                  </p>

                  <div className="flex gap-3 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDeleteModalOpen(false)}
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

export default ManageProducts;
