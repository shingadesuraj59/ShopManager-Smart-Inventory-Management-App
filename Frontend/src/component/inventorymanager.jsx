import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiCheck, FiPrinter, FiDownload, FiBox } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';

function InventoryManager() {
    const { backend_url, token } = useContext(StoreContext);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        actualPrice: '',
        sellingPrice: '',
        quantity: '',
        reorderLevel: '',
        supplier: '',
        expirationDate: '',
    });
    const [quantityUpdate, setQuantityUpdate] = useState({
        id: '',
        quantity: '',
        actualPrice: '',
        sellingPrice: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showScanModal, setShowScanModal] = useState(false);
    const [scannedId, setScannedId] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const url = backend_url + '/api/inventory/list';
        const headers = {
            headers: {
                "Authorization": token
            }
        };
        axios.get(url, headers)
            .then(response => setProducts(response.data))
            .catch(error => handleError('Error fetching products'));
    };

    const getCurrentDate = () => new Date().toLocaleDateString();

    const addProduct = () => {
        const productWithDate = {
            ...newProduct,
            dateAdded: getCurrentDate(),
        };

        const url = backend_url + '/api/inventory/add';
        const headers = {
            headers: {
                "Authorization": token
            }
        };
        axios.post(url, productWithDate, headers)
            .then(response => {
                const addedProduct = response.data;
                setProducts([...products, addedProduct]);
                setNewProduct({
                    name: '',
                    category: '',
                    actualPrice: '',
                    sellingPrice: '',
                    quantity: '',
                    reorderLevel: '',
                    supplier: '',
                    expirationDate: '',
                });
                setShowAddForm(false);

                if (response.status === 201) {
                    handleSuccess("Product Added Successfully");
                    setSelectedProduct(addedProduct);
                    setShowQRModal(true);
                }
            })
            .catch(error => {
                console.error('Error adding product:', error);
                handleError(error.response?.data?.message || "Error adding product");
            });
    };

    const updateQuantity = () => {
        const { id, quantity, actualPrice, sellingPrice } = quantityUpdate;
        const updatedProduct = {
            quantity: parseInt(quantity),
            actualPrice: parseFloat(actualPrice),
            sellingPrice: parseFloat(sellingPrice),
            dateUpdated: new Date().toLocaleDateString(),
        };
        const url = backend_url + `/api/inventory/update-product/${id}`;
        const headers = {
            headers: {
                "Authorization": token
            }
        };
        axios.put(url, updatedProduct, headers)
            .then(response => {
                setProducts(products.map(product =>
                    product._id === response.data._id ? response.data : product
                ));
                setQuantityUpdate({
                    id: '',
                    quantity: '',
                    actualPrice: '',
                    sellingPrice: '',
                });
                setShowUpdateModal(false);
                if (response.status === 200) {
                    handleSuccess("Product Updated Successfully");
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                handleError(error.response?.data?.message || "Error updating product");
            });
    };

    const deleteProduct = (id) => {
        const url = backend_url + `/api/inventory/delete/${id}`;
        const headers = {
            headers: {
                "Authorization": token
            }
        };

        axios.delete(url, headers)
            .then(response => {
                setProducts(products.filter(product => product._id !== id));
                if (response.status === 200) {
                    handleSuccess("Product deleted Successfully");
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                handleError(error.response?.data?.message || "Error deleting product");
            });
    };

    const generateQRCode = (product) => {
        setSelectedProduct(product);
        setShowQRModal(true);
    };

    const getQRCodeData = (product) => {
        const productData = {
            id: product._id
        };
        return encodeURIComponent(JSON.stringify(productData));
    };

    const getQRCodeUrl = (product) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getQRCodeData(product)}`;
    };

    const handleScanQR = () => {
        setShowScanModal(true);
    };

    const handleScannedId = (e) => {
        e.preventDefault();
        const product = products.find(p => p._id === scannedId);
        if (product) {
            setSelectedProduct(product);
            setShowQRModal(true);
            setShowScanModal(false);
            setScannedId('');
        } else {
            handleError("Product not found with the given ID");
        }
    };

    const openUpdateModal = (product) => {
        setProductToUpdate(product);
        setQuantityUpdate({
            id: product._id,
            quantity: product.quantity,
            actualPrice: product.actualPrice,
            sellingPrice: product.sellingPrice,
        });
        setShowUpdateModal(true);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Inventory Management</h1>
                        <p className="text-gray-600 truncate">Manage your products and stock levels</p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all whitespace-nowrap"
                        >
                            <FiPlus className="mr-2" />
                            <span className="hidden xs:inline">Add Product</span>
                            <span className="inline xs:hidden">Add</span>
                        </button>
                    </div>
                </div>

                {/* Add Product Form */}
                {showAddForm && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['name', 'category', 'actualPrice', 'sellingPrice', 'quantity', 'reorderLevel', 'supplier'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        type={['actualPrice', 'sellingPrice', 'quantity', 'reorderLevel'].includes(field) ? 'number' : 'text'}
                                        placeholder={`Enter ${field}`}
                                        value={newProduct[field]}
                                        onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                                <input
                                    type="date"
                                    value={newProduct.expirationDate}
                                    onChange={(e) => setNewProduct({ ...newProduct, expirationDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addProduct}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <FiBox className="text-blue-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-500">{product._id.substring(0, 8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{product.actualPrice}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{product.sellingPrice}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.quantity <= product.reorderLevel
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.reorderLevel}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.supplier}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => openUpdateModal(product)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                    <button
                                                        onClick={() => generateQRCode(product)}
                                                        className="text-purple-600 hover:text-purple-900"
                                                        title="QR Code"
                                                    >
                                                        <FiDownload />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(product._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No products found. Add some products to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QR Code Modal */}
                {showQRModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    QR Code for {selectedProduct.name}
                                </h2>
                                <button
                                    onClick={() => setShowQRModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src={getQRCodeUrl(selectedProduct)}
                                    alt="QR Code"
                                    className="w-48 h-48 mb-4 border border-gray-200 p-2"
                                />
                                <div className="text-sm text-gray-600 mb-4">
                                    Product ID: {selectedProduct._id}
                                </div>
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <FiPrinter className="mr-2" />
                                    Print QR Code
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Update Product Modal */}
                {showUpdateModal && productToUpdate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Update {productToUpdate.name}
                                </h2>
                                <button
                                    onClick={() => setShowUpdateModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        value={quantityUpdate.quantity}
                                        onChange={(e) => setQuantityUpdate({ ...quantityUpdate, quantity: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                                    <input
                                        type="number"
                                        value={quantityUpdate.actualPrice}
                                        onChange={(e) => setQuantityUpdate({ ...quantityUpdate, actualPrice: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                                    <input
                                        type="number"
                                        value={quantityUpdate.sellingPrice}
                                        onChange={(e) => setQuantityUpdate({ ...quantityUpdate, sellingPrice: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowUpdateModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateQuantity}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update Product
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* QR Scanner Modal */}
                {showScanModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Scan Product QR Code</h2>
                                <button
                                    onClick={() => setShowScanModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleScannedId} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter Product ID</label>
                                    <input
                                        type="text"
                                        value={scannedId}
                                        onChange={(e) => setScannedId(e.target.value)}
                                        placeholder="Paste product ID here"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowScanModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Find Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default InventoryManager;