import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from "axios";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { StoreContext } from '../Context/StoreContext';



const Login = () => {
  const {backend_url,token,setToken} = useContext(StoreContext);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
  
    if (!email || !password) {
      return handleError("All fields are required");
    }
  
    if (password.length < 4) {
      return handleError("Password must be at least 4 characters");
    }
  
    setLoading(true);
    try {
      const response = await axios.post(backend_url+"/api/login", loginInfo);
      const { success, message, jwttoken, name } = response.data;
  
      if (success) {
        handleSuccess(message || "Login successful!");
        localStorage.setItem("token", jwttoken);
        setToken(localStorage.getItem("token"));
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        handleError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      handleError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header with decorative element */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Sign in to manage your business</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={loginInfo.email}
                placeholder="Email Address"
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={loginInfo.password}
                placeholder="Password"
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
                minLength="4"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                'Signing In...'
              ) : (
                <>
                  Login <FiLogIn className="ml-2" />
                </>
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition flex items-center justify-center"
              >
                Create Account <FiUserPlus className="ml-1" />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;