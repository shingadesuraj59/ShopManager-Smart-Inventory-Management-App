import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiPackage, FiUsers, FiUser, FiPieChart, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Update authentication state
    setIsAuthenticated(false);
    // Close mobile menu if open
    setMobileMenuOpen(false);
    // Redirect to home page
    navigate('/');
  };

  const NavLink = ({ to, icon, text }) => {
    const isActive = location.pathname === to;
    return (
      <button
        onClick={() => {
          navigate(to);
          setMobileMenuOpen(false);
        }}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          isActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        } transition-colors duration-200`}
      >
        <span className="mr-2">{icon}</span>
        {text}
      </button>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span 
                onClick={() => navigate('/')} 
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              >
                ShopManager
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" icon={<FiHome size={18} />} text="Dashboard" />
                <NavLink to="/billgenerator" icon={<FiFileText size={18} />} text="Bills" />
                <NavLink to="/inventorymanager" icon={<FiPackage size={18} />} text="Inventory" />
                <NavLink to="/customeraccount" icon={<FiUsers size={18} />} text="Customers" />
                <NavLink to="/profile" icon={<FiUser size={18} />} text="Profile" />
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                >
                  <span className="mr-2"><FiLogOut size={18} /></span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" icon={<FiHome size={18} />} text="Home" />
                <NavLink to="/about" icon={<FiPieChart size={18} />} text="About" />
                <NavLink to="/login" icon={<FiUser size={18} />} text="Login" />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" icon={<FiHome size={18} />} text="Dashboard" />
                <NavLink to="/billgenerator" icon={<FiFileText size={18} />} text="Bills" />
                <NavLink to="/inventorymanager" icon={<FiPackage size={18} />} text="Inventory" />
                <NavLink to="/customeraccount" icon={<FiUsers size={18} />} text="Customers" />
                <NavLink to="/profile" icon={<FiUser size={18} />} text="Profile" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                >
                  <span className="mr-2"><FiLogOut size={18} /></span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" icon={<FiHome size={18} />} text="Home" />
                <NavLink to="/about" icon={<FiPieChart size={18} />} text="About" />
                <NavLink to="/login" icon={<FiUser size={18} />} text="Login" />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;