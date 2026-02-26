import { useEffect, useState } from "react";
import useGetMe from "../../../Hooks/useGetMe";
import useAxiosNotSecure from "../../../Hooks/useAxiosNotSecure";
import {
  User,
  Phone,
  MapPin,
  Mail,
  Hash,
  Shield,
  Edit3,
  X,
  Save,
  Loader2,
} from "lucide-react";

const Settings = () => {
  const { meData, refetch } = useGetMe();
  const user = meData || {};
  const { axiosNotSecure } = useAxiosNotSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      });
    }
  }, [meData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axiosNotSecure.patch(`/user`, formData);
    if (res) {
      refetch();
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">
            Manage your profile information and preferences
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header Card */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-400 to-purple-600 px-4 sm:px-8 py-5">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center shadow-2xl text-4xl sm:text-5xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 text-white border-4 border-white/30">
                {user.userName ? user.userName[0].toUpperCase() : "U"}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 sm:mt-4 mb-1">
                  {user.userName || "User Name"}
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-purple-100">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm">{user.email || "No Email Provided"}</p>
                </div>
                {user.role && (
                  <div className="mt-3 px-4 inline-flex text-center py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium capitalize flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      {user.role}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Contact Number */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border-2 border-blue-100">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Contact Number
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">
                      {user.contactNo || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border-2 border-green-100">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Location
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">
                      {user.location || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Code */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border-2 border-orange-100">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Hash className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Post Code
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">
                      {user.postCode || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email (Additional Info) */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl border-2 border-purple-100">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Email Address
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">
                      {user.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-200">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:scale-[1.02]"
              >
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header - Fixed */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 px-4 sm:px-8 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3">
                  <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Edit Profile
                  </h2>
                  <p className="text-purple-100 text-xs sm:text-sm hidden sm:block">
                    Update your personal information
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Form - Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleFormSubmit} className="p-4 sm:p-8">
                <div className="space-y-4 sm:space-y-6">
                {/* User Name */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl border-2 border-purple-100">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 text-purple-600" />
                    Full Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border-2 border-blue-100">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Location */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border-2 border-green-100">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-200 text-sm sm:text-base"
                      placeholder="Enter your location"
                    />
                  </div>

                  {/* Post Code */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border-2 border-orange-100">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                      <Hash className="w-4 h-4 text-orange-600" />
                      Post Code
                    </label>
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-200 text-sm sm:text-base"
                      placeholder="Enter your post code"
                    />
                  </div>
                </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;