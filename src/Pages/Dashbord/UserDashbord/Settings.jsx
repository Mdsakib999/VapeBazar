import { useEffect, useState } from "react";
import useGetMe from "../../../Hooks/useGetMe";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";

const Settings = () => {
    const { meData, refetch } = useGetMe();
    const user = meData || {};
    const { axiosNotSecure } = useAxiosNotSecure()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        userName: user.userName || "",
        contactNo: user.contactNo || "",
        location: user.location || "",
        postCode: user.postCode || "",
        role: user.role || "",
    });

    useEffect(() => {
        if (meData) {
            setFormData({
                userName: meData.userName,
                contactNo: meData.contactNo,
                location: meData.location,
                postCode: meData.postCode,
            })
        }
    }, [meData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Updated User Data:", formData);
        const res = await axiosNotSecure.patch(`/user`, formData);
        if (res) {
            refetch()
            setIsModalOpen(false); // Close the modal
        }
        // Add API call logic to update user information here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md text-3xl font-bold text-purple-600">
                        {user.userName ? user.userName[0].toUpperCase() : "U"}
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                        {user.userName || "User Name"}
                    </h2>
                    <p className="text-center text-gray-500 mb-4">
                        {user.email || "No Email Provided"}
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-500 font-medium">Contact No:</span>
                            <span className="text-gray-800">{user.contactNo || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-500 font-medium">Location:</span>
                            <span className="text-gray-800">{user.location || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-500 font-medium">Post Code:</span>
                            <span className="text-gray-800">{user.postCode || "N/A"}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-500 font-medium">Role:</span>
                            <span className="text-gray-800 capitalize">{user.role || "N/A"}</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Profile */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Update Your Profile
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Contact No
                                    </label>
                                    <input
                                        type="text"
                                        name="contactNo"
                                        value={formData.contactNo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Enter your contact number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Enter your location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Post Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postCode"
                                        value={formData.postCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder="Enter your post code"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Settings;
