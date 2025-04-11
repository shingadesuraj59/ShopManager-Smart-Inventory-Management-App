import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiShoppingCart, FiStar, FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';


const ProductList = () => {
  const {backend_url,token} = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState('all');
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = backend_url+'/api/products';
        const headers = {
          headers: {
            Authorization: token,
          },
        };
        
        const response = await axios.get(url, headers);
        setProducts(response.data);
      } catch (error) {
        toast.error('Error fetching products');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === 'lowStock') {
      return matchesSearch && product.quantity <= product.reorderLevel;
    } else if (filterOption === 'expiring') {
      const today = new Date();
      const expDate = new Date(product.expirationDate);
      return matchesSearch && expDate < new Date(today.setDate(today.getDate() + 30));
    }
    
    return matchesSearch;
  });

  const getStockStatus = (quantity, reorderLevel) => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const getExpirationStatus = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
    
    if (expDate < new Date()) return 'expired';
    if (expDate < thirtyDaysFromNow) return 'expiring-soon';
    return 'fresh';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {loggedInUser}'s Product Inventory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage and track all your products in one place
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Products</option>
              <option value="lowStock">Low Stock</option>
              <option value="expiring">Expiring Soon</option>
            </select>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</h3>
            <p className="text-3xl font-bold text-orange-500">
              {products.filter(p => p.quantity <= p.reorderLevel).length}
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Expiring Soon</h3>
            <p className="text-3xl font-bold text-red-500">
              {products.filter(p => {
                const today = new Date();
                const expDate = new Date(p.expirationDate);
                return expDate < new Date(today.setDate(today.getDate() + 30));
              }).length}
            </p>
          </div>
        </motion.div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                  getStockStatus(product.quantity, product.reorderLevel) === 'out-of-stock' ? 'border-l-4 border-red-500' :
                  getStockStatus(product.quantity, product.reorderLevel) === 'low-stock' ? 'border-l-4 border-yellow-500' : ''
                }`}
              >
                <div className="p-6">
                  {/* Product Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{product.name}</h2>
                    {getStockStatus(product.quantity, product.reorderLevel) === 'low-stock' && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FiAlertTriangle className="mr-1" /> Low Stock
                      </span>
                    )}
                    {getStockStatus(product.quantity, product.reorderLevel) === 'out-of-stock' && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Out of Stock</span>
                    )}
                  </div>

                  {/* Price Information */}
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600 mr-2">
                      ₹{product.sellingPrice}
                    </span>
                    {product.actualPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.actualPrice}
                      </span>
                    )}
                  </div>

                  {/* Stock Information */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Quantity:</span>
                      <span className="font-medium">{product.quantity} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          getStockStatus(product.quantity, product.reorderLevel) === 'out-of-stock' ? 'bg-red-500' :
                          getStockStatus(product.quantity, product.reorderLevel) === 'low-stock' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (product.quantity / (product.reorderLevel * 3)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Expiration Status */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Expires:</span>
                      <span className={`font-medium ${
                        getExpirationStatus(product.expirationDate) === 'expired' ? 'text-red-600' :
                        getExpirationStatus(product.expirationDate) === 'expiring-soon' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {new Date(product.expirationDate).toLocaleDateString()}
                        {getExpirationStatus(product.expirationDate) === 'expired' && ' (Expired)'}
                        {getExpirationStatus(product.expirationDate) === 'expiring-soon' && ' (Soon)'}
                      </span>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {product.reorderLevel && (
                      <div className="flex justify-between">
                        <span>Reorder Level:</span>
                        <span>{product.reorderLevel}</span>
                      </div>
                    )}
                    {product.category && (
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="text-blue-600">{product.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      <FiShoppingCart className="inline mr-2" /> Add to Cart
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg transition-colors">
                      <FiStar />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm ? 'No products match your search' : 'No products available'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Add new products to get started'}
            </p>
          </motion.div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductList;