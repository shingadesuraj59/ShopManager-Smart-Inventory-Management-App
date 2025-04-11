import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { Camera, X, Plus, Trash2, Printer, Download, Search } from 'lucide-react';
import QrScanner from 'qr-scanner';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from "../utils.js";
import { StoreContext } from '../Context/StoreContext.jsx';
import 'react-toastify/dist/ReactToastify.css';

function BillGenerator() {
    const { fetchCustomers, customerData,backend_url,token} = useContext(StoreContext);
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deposit, setDeposit] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [showDepositField, setShowDepositField] = useState(false);
    const [bill, setBill] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scannedSku, setScannedSku] = useState('');
    const [quantityInput, setQuantityInput] = useState(1);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const billRef = useRef();
    const videoRef = useRef();
    const qrScannerRef = useRef(null);

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            const customer = customerData.find(c => c._id === selectedCustomer);
            if (customer) {
                setCustomerId(customer._id);
                setCustomerName(customer.customerName);
                setPhoneNumber(customer.phoneNumber || '');
            }
        }
    }, [selectedCustomer, customerData]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const url =backend_url+'/api/inventory/list';
            const headers = {
                headers: {
                    "Authorization":token
                }
            };
            const response = await axios.get(url, headers);
            setProducts(response.data);
        } catch (error) {
            handleError('Error fetching products');
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = (productId, quantity) => {
        const product = products.find(p => p._id === productId);
        if (!product) return;

        const existingItemIndex = items.findIndex(item => item.productId === productId);
        const quantityNum = parseFloat(quantity) || 1;

        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            const newQuantity = parseFloat(updatedItems[existingItemIndex].quantity) + quantityNum;
            updatedItems[existingItemIndex].quantity = newQuantity;
            updatedItems[existingItemIndex].total = product.sellingPrice * newQuantity;
            setItems(updatedItems);
            handleSuccess(`Updated ${product.name} quantity to ${newQuantity}`);
        } else {
            setItems([...items, {
                productId,
                productName: product.name,
                quantity: quantityNum,
                price: product.sellingPrice,
                total: product.sellingPrice * quantityNum
            }]);
            handleSuccess(`Added ${product.name} to bill`);
        }

        if (!showDepositField) setShowDepositField(true);
    };

    const startScanner = async () => {
        try {
            setIsScanning(true);
            await new Promise(resolve => setTimeout(resolve, 100));

            if (videoRef.current) {
                qrScannerRef.current = new QrScanner(
                    videoRef.current,
                    result => {
                        const scannedValue = result.data;
                        setScannedSku(scannedValue);
                        stopScanner();
                        handleSuccess('QR code scanned successfully!');
                    },
                    { returnDetailedScanResult: true }
                );
                await qrScannerRef.current.start();
            }
        } catch (error) {
            handleError('Error accessing camera: ' + error.message);
            setIsScanning(false);
        }
    };

    const stopScanner = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current = null;
        }
        setIsScanning(false);
    };

    const handleScan = (e) => {
        e.preventDefault();
        try {
            const parsedSku = JSON.parse(scannedSku);
            const product = products.find(p => p._id === parsedSku.id);

            if (product) {
                addItem(product._id, quantityInput);
                setScannedSku('');
                setQuantityInput(1);
                setIsScannerOpen(false);
            } else {
                handleError(`Product with SKU ${scannedSku} not found`);
            }
        } catch (error) {
            handleError('Invalid QR code format');
        }
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        if (newItems.length === 0) {
            setShowDepositField(false);
            setDeposit('');
        }
    };

    const createBill = async () => {
        if (!customerName || items.length === 0) {
            setErrors(['Customer name and at least one item are required.']);
            handleError('Customer name and at least one item are required.');
            return;
        }

        const grandTotal = items.reduce((acc, item) => acc + item.total, 0);
        if (deposit && parseFloat(deposit) > grandTotal) {
            setErrors(['Deposit amount cannot be greater than grand total']);
            handleError('Deposit amount cannot be greater than grand total');
            return;
        }

        setErrors([]);
        setIsLoading(true);

        try {
            const url =backend_url+'/api/bill/create';
            const headers = {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            };
            const response = await axios.post(url, {
                customerName,
                phoneNumber,
                deposit: deposit || 0,
                customerId,
                items
            }, headers);

            setBill(response.data);
            setItems([]);
            setCustomerName('');
            setPhoneNumber('');
            setDeposit('');
            setSelectedCustomer('');
            setShowDepositField(false);
            handleSuccess('Bill created successfully');
        } catch (error) {
            setErrors([error.response?.data?.message || 'Error creating bill']);
            handleError("Error in creating bill");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => billRef.current,
        documentTitle: 'Bill_Details',
        onAfterPrint: () => handleSuccess('Print success!'),
    });



    const shareOnWhatsApp = (bill) => {
        // Generate the bill summary message
        let message = `*Bill Receipt - Anuradha Trading Company*\n\n`;
        message += `*Customer Name:* ${bill.customerName}\n`;
        if (bill.phoneNumber) message += `*Phone:* ${bill.phoneNumber}\n`;
        message += `*Bill Number:* ${bill.billNumber}\n`;
        message += `*Date:* ${new Date(bill.date).toLocaleDateString()}\n\n`;
        message += `*Items Purchased:*\n`;
        
        bill.items.forEach((item, index) => {
            message += `${index + 1}. ${item.productName} - ${item.quantity} x ₹${item.price} = ₹${item.total}\n`;
        });
        
        message += `\n*Grand Total:* ₹${bill.grandTotal.toFixed(2)}\n`;
        if (bill.deposit > 0) {
            message += `*Deposit Paid:* ₹${bill.deposit.toFixed(2)}\n`;
            message += `*Balance Due:* ₹${(bill.grandTotal - bill.deposit).toFixed(2)}\n`;
        }
        
        message += `\nThank you for your business!`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // If customer has a phone number, use it, otherwise just open WhatsApp
        const phoneParam = bill.phoneNumber ? `&phone=${bill.phoneNumber}` : '';
        
        // Open WhatsApp with the message
        window.open(`https://wa.me/?text=${encodedMessage}${phoneParam}`, '_blank');
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(28);
        doc.setTextColor(0, 51, 102);
        doc.text("Anuradha Trading Company", 105, 15, { align: "center" });
        doc.setDrawColor(0, 51, 102);
        doc.setLineWidth(0.5);
        doc.line(20, 20, 190, 20);

        // Title
        doc.setFontSize(20);
        doc.setTextColor(0, 102, 204);
        doc.text("Bill Details", 105, 30, { align: "center" });
        doc.setDrawColor(0, 102, 204);
        doc.line(20, 35, 190, 35);

        // Customer Info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Customer Name: ${bill.customerName}`, 20, 45);
        doc.text(`Bill Number: ${bill.billNumber}`, 20, 55);
        doc.text(`Date: ${new Date(bill.date).toLocaleDateString()}`, 20, 65);

        // Table Header
        doc.setFillColor(200, 200, 200);
        doc.rect(20, 75, 170, 10, "F");
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text("S.No", 25, 82);
        doc.text("Product Name", 50, 82);
        doc.text("Quantity", 105, 82);
        doc.text("Price (₹)", 125, 82);
        doc.text("Total (₹)", 170, 82, { align: "right" });

        // Table Rows
        let yOffset = 92;
        bill.items.forEach((item, index) => {
            doc.text(`${index + 1}`, 25, yOffset);
            doc.text(item.productName, 50, yOffset);
            doc.text(item.quantity.toString(), 105, yOffset);
            doc.text(`₹${item.price.toFixed(2)}`, 125, yOffset);
            doc.text(`₹${item.total.toFixed(2)}`, 170, yOffset, { align: "right" });
            yOffset += 10;
        });

        // Summary
        yOffset += 10;
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text(`Grand Total: ₹${bill.grandTotal.toFixed(2)}`, 20, yOffset);
        doc.text(`Deposit: ₹${(bill.deposit || 0).toFixed(2)}`, 20, yOffset + 10);
        doc.text(`Balance: ₹${(bill.grandTotal - (bill.deposit || 0)).toFixed(2)}`, 20, yOffset + 20);
        doc.text(`Net Quantity: ${bill.netQuantity}`, 20, yOffset + 30);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text("Thank you for your business!", 105, 290, { align: "center" });

        doc.save("bill.pdf");
        handleSuccess("PDF Saved Successfully");
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grandTotal = items.reduce((acc, item) => acc + item.total, 0);
    const balance = grandTotal - (parseFloat(deposit) || 0);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold">Bill Generator</h1>
                    <p className="text-blue-100 mt-1">Create and manage customer invoices</p>
                </div>

                <div className="p-6">
                    {errors.length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        {errors.join(', ')}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customer Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Existing Customer</label>
                                <select
                                    value={selectedCustomer}
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">-- Select Customer --</option>
                                    {customerData.map(customer => (
                                        <option key={customer._id} value={customer._id}>
                                            {customer.customerName} {customer.phoneNumber ? `(${customer.phoneNumber})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center flex items-center justify-center text-gray-500">
                                OR
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter customer name"
                                    value={customerName}
                                    onChange={(e) => {
                                        setCustomerName(e.target.value);
                                        setSelectedCustomer('');
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        setSelectedCustomer('');
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add Products</h2>
                            <button
                                onClick={() => setIsScannerOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <Camera size={18} /> Scan QR Code
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                                <select
                                    onChange={(e) => {
                                        const selectedProduct = e.target.value;
                                        if (selectedProduct) {
                                            addItem(selectedProduct, quantityInput);
                                            e.target.value = '';
                                        }
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">-- Select Product --</option>
                                    {filteredProducts.map(product => (
                                        <option key={product._id} value={product._id}>
                                            {product.name} - ₹{product.sellingPrice} {product.sku && `(SKU: ${product.sku})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                <input
                                    type="number"
                                    value={quantityInput}
                                    onChange={(e) => setQuantityInput(e.target.value)}
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Quantity"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="border rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.length > 0 ? (
                                        items.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ₹{item.price.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ₹{item.total.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => removeItem(index)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No items added yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
                                <p className="text-2xl font-semibold text-gray-800">{items.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Grand Total</h3>
                                <p className="text-2xl font-semibold text-blue-600">₹{grandTotal.toFixed(2)}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Net Quantity</h3>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                                </p>
                            </div>
                        </div>

                        {showDepositField && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (₹)</label>
                                <input
                                    type="number"
                                    value={deposit}
                                    onChange={(e) => setDeposit(e.target.value)}
                                    placeholder="Enter deposit amount"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        )}

                        {deposit && (
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Balance Due</h3>
                                <p className="text-2xl font-semibold text-green-600">₹{balance.toFixed(2)}</p>
                            </div>
                        )}

                        <button
                            onClick={createBill}
                            disabled={items.length === 0 || isLoading}
                            className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${items.length === 0 || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? 'Generating Bill...' : 'Generate Bill'}
                        </button>
                    </div>

                    {/* Generated Bill Preview */}
                    {bill && (
                        <div className="border rounded-lg p-6 bg-white shadow-sm">
                            <div ref={billRef} className="p-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-blue-800">Anuradha Trading Company</h2>
                                    <p className="text-gray-600">123 Business Street, City, Country</p>
                                    <p className="text-gray-600">Phone: +1234567890 | Email: info@company.com</p>
                                    <div className="my-4 border-t border-gray-300"></div>
                                    <h3 className="text-xl font-semibold text-blue-700">INVOICE</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h4 className="text-lg font-medium text-gray-800 mb-2">Bill To:</h4>
                                        <p className="text-gray-700">{bill.customerName}</p>
                                        {bill.phoneNumber && <p className="text-gray-700">Phone: {bill.phoneNumber}</p>}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-700"><span className="font-medium">Invoice #:</span> {bill.billNumber}</p>
                                        <p className="text-gray-700"><span className="font-medium">Date:</span> {new Date(bill.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bill.items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.productName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{item.total.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Thank you for your business!</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between py-2">
                                            <span className="font-medium text-gray-700">Subtotal:</span>
                                            <span className="text-gray-700">₹{bill.grandTotal.toFixed(2)}</span>
                                        </div>
                                        {bill.deposit > 0 && (
                                            <div className="flex justify-between py-2">
                                                <span className="font-medium text-gray-700">Deposit:</span>
                                                <span className="text-gray-700">-₹{bill.deposit.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-2 border-t border-gray-200">
                                            <span className="font-bold text-gray-800">Balance Due:</span>
                                            <span className="font-bold text-blue-600">₹{(bill.grandTotal - (bill.deposit || 0)).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mt-6">
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Printer size={18} /> Print Bill
                                </button>
                                <button
                                    onClick={saveAsPDF}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Download size={18} /> Save as PDF
                                </button>
                                {/* Add this button with the other action buttons */}
                                <button
                                    onClick={() => shareOnWhatsApp(bill)}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Share via WhatsApp
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* QR Scanner Modal */}
            {isScannerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Scan Product QR Code</h2>
                                <button
                                    onClick={() => {
                                        setIsScannerOpen(false);
                                        stopScanner();
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {isScanning ? (
                                <div className="mb-4">
                                    <div className="relative w-full aspect-square">
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-cover rounded-lg border-2 border-blue-500"
                                        ></video>
                                        <div className="absolute inset-0 border-4 border-blue-500 border-dashed rounded-lg opacity-30 pointer-events-none"></div>
                                    </div>
                                    <p className="text-center mt-2 text-gray-600">Position QR code within the frame</p>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={stopScanner}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            <X size={18} /> Cancel Scanning
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleScan}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Scanned SKU Code</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                value={scannedSku}
                                                onChange={(e) => setScannedSku(e.target.value)}
                                                placeholder="Enter or scan SKU"
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={startScanner}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
                                            >
                                                <Camera size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                        <input
                                            type="number"
                                            value={quantityInput}
                                            onChange={(e) => setQuantityInput(e.target.value)}
                                            min="0.01"
                                            step="0.01"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsScannerOpen(false);
                                                setScannedSku('');
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!scannedSku}
                                            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${!scannedSku ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            Add to Bill
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default BillGenerator;