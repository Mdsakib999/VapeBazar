import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

const ManageUsers = () => {
    // Mock user data
    // const { data: usersData } = useGetAllUsersQuery()
    const { axiosNotSecure } = useAxiosNotSecure()
    const [search, setSearch] = useState('')
    const { data: usersData = [], refetch, isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            // const params = {}
            // if (search) params.search = search;
            const res = await axiosNotSecure.get(`/users`, {
                params: { search }
            });
            return res.data;
        },
    });
    console.log(usersData);
    // const [updateUser] = useUpdateUserMutation()
    // const [deleteUser] = useDeleteUserMutation()

    const users = usersData


    // Handle role change
    // const handleRoleChange = async (id, newRole) => {
    //   const payload = { id, role: newRole }
    //   console.log(payload);
    //   const res2 = await updateUser(payload)
    //   if (res2) {
    //     // toast.success('User Role Update')
    //     Swal.fire({
    //       title: "Change!",
    //       text: "User role has been Change",
    //       icon: "success"
    //     });
    //   }

    // };

    const handleRoleChange = async (id, newRole) => {
        // Show confirmation dialog
        const result = confirm('Do You want to Change Role')

        // Proceed only if the user confirmed the action
        if (result) {
            const payload = { role: newRole };
            console.log(payload);

            const res = await axiosNotSecure.patch(`/user/${id}`, payload);
            if (res) {
                refetch()
                toast.success('User Role Update Successfully')
            }
        }
    };



    // Handle user removal
    const handleRemoveUser = async (id) => {
        // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        const result = confirm('Do You want to Delete Users')
        if (result) {
            const res = await axiosNotSecure.delete(`/user/${id}`);
            if (res) {
                refetch()
                toast.success('User Delete Successfully')
            }

        }

    };

    return (
        <div className="p-6 bg-gray-50 text-black min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Manage Users</h1>
            <div className="relative md:flex text-black  items-center group  pt-1">
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 group-hover:border-orange-500 rounded-full py-2 px-4 pl-10 md:max-w-[320px] focus:outline-none focus:border-orange-400"
                />
                <FiSearch
                    className="absolute left-3 top-4 group-hover:text-orange-500"
                    size={22}
                />
            </div>
            <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Contact No</th>
                            <th className="p-2 border">Active Role</th>
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id} className="text-center border-b">
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">{user.contactNo}</td>
                                <td
                                    className={`p-2 border font-bold ${user.role === "user" ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {user.role === "user" ? "User" : "Admin"}
                                </td>
                                <td className="p-2 border">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-2 border ">
                                    <button
                                        onClick={() => handleRemoveUser(user._id)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 "
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
