import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiPhone, FiMail, FiEdit2, FiCheck } from 'react-icons/fi';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

const Profile = () => {
  const { backend_url, token } = useContext(StoreContext);
  const [profile, setProfile] = useState({
    businessName: '',
    phoneNumber: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(backend_url + '/api/profile', {
          headers: {
            Authorization: token
          }
        });

        console.log('bac',response.data.user);
        setCurrentUser(response.data.user);
        setProfile({
          businessName: response.data.user.name || '',
          phoneNumber: response.data.user.phoneNumber || '',
          email: response.data.user.email || ''
        });
      } catch (error) {
        handleError(error.response?.data?.message || 'Error fetching profile');
      }
    };
    
    fetchProfile();
  }, [backend_url, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!profile.phoneNumber.match(/^[0-9]{10}$/)) {
      return handleError('Please enter a valid 10-digit phone number');
    }

    setLoading(true);
    try {
      const response = await axios.post(
        backend_url + '/api/manage-profile',
        {
          businessName: profile.businessName,
          phoneNumber: profile.phoneNumber
          // Don't send email as it shouldn't be changed
        },
        { headers: { Authorization: token } }
      );
      handleSuccess('Profile updated successfully!');
      setCurrentUser(response.data.user);
      setEditMode(false);
    } catch (error) {
      handleError(error.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 px-6 py-8 text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4">
              <FiUser className="text-indigo-600 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {currentUser?.businessName || 'Your Business'}
            </h1>
            <p className="text-indigo-100 mt-1">
              {currentUser?.email || 'user@example.com'}
            </p>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <FiEdit2 className="mr-1" /> Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        name="businessName"
                        value={profile.businessName}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Your business name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        readOnly
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="9876543210"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      'Processing...'
                    ) : (
                      <>
                        <FiCheck className="inline mr-1" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="text-gray-900 font-medium mt-1">
                      {currentUser?.name || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium mt-1">
                      {currentUser?.email || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-900 font-medium mt-1">
                      {currentUser?.phoneNumber || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Profile;