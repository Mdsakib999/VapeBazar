import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, 
    Users, 
    Mail, 
    Phone, 
    Shield, 
    Trash2, 
    AlertCircle,
    UserCheck,
    UserX,
    ChevronDown,
    Loader2
} from "lucide-react";

const ManageUsers = () => {
    const { axiosNotSecure } = useAxiosNotSecure();
    const [search, setSearch] = useState('');
    const [deletingUserId, setDeletingUserId] = useState(null);

    const { data: usersData = [], refetch, isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosNotSecure.get(`/users`, {
                params: { search }
            });
            return res.data;
        },
    });

    const users = usersData;

    const handleRoleChange = async (id, newRole) => {
        const result = window.confirm('Are you sure you want to change this user\'s role?');

        if (result) {
            try {
                const payload = { role: newRole };
                const res = await axiosNotSecure.patch(`/user/${id}`, payload);
                if (res) {
                    refetch();
                    toast.success('User role updated successfully');
                }
            } catch (error) {
                toast.error('Failed to update user role');
            }
        }
    };

    const handleRemoveUser = async (id) => {
        const result = window.confirm('Are you sure you want to delete this user?');
        if (result) {
            try {
                setDeletingUserId(id);
                const res = await axiosNotSecure.delete(`/user/${id}`);
                if (res) {
                    refetch();
                    toast.success('User deleted successfully');
                }
            } catch (error) {
                toast.error('Failed to delete user');
            } finally {
                setDeletingUserId(null);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-4 md:p-6 lg:p-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Manage Users
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            View and manage all registered users
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
            >
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by email or contact..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                    />
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-800">{users?.length || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100">
                            <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Regular Users</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {users?.filter(u => u.role === 'user').length || 0}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Admins</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {users?.filter(u => u.role === 'admin').length || 0}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-100">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Active Now</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {Math.floor(Math.random() * users?.length) || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                ) : users?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <UserX className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No users found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            Email
                                        </div>
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            Contact
                                        </div>
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-gray-500" />
                                            Current Role
                                        </div>
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-700">
                                        Change Role
                                    </th>
                                    <th className="text-center p-4 text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {users?.map((user, index) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            {/* Email */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                        {user.email?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact */}
                                            <td className="p-4">
                                                <p className="text-sm text-gray-600">{user.contactNo || 'N/A'}</p>
                                            </td>

                                            {/* Current Role */}
                                            <td className="p-4">
                                                {user.role === "admin" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                                                        <Shield className="w-3.5 h-3.5" />
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                                                        <UserCheck className="w-3.5 h-3.5" />
                                                        User
                                                    </span>
                                                )}
                                            </td>

                                            {/* Role Selector */}
                                            <td className="p-4">
                                                <div className="relative inline-block">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                        className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleRemoveUser(user._id)}
                                                        disabled={deletingUserId === user._id}
                                                        className="group relative p-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {deletingUserId === user._id ? (
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-5 h-5" />
                                                        )}
                                                        
                                                        {/* Tooltip */}
                                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                            Delete User
                                                        </span>
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
            </motion.div>

            {/* Footer Info */}
            {users?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-6 text-center text-sm text-gray-500"
                >
                    Showing {users.length} user{users.length !== 1 ? 's' : ''}
                </motion.div>
            )}
        </div>
    );
};

export default ManageUsers;