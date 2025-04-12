import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./component/signup";
import Login from "./component/login";
import About from "./component/About";
import RefreshHandler from "./component/RefreshHandler";
import Dashboard from "./component/dashboard";
import BillGenerator from "./component/billgenerator";
import InventoryManager from "./component/inventorymanager";
import HomePage from "./component/HomePage";
import NotFoundPage from './component/NotFoundPage'; 
import Profile from "./component/profile";
import ShowBill from "./component/ShowBill";
import StockAnalysis from "./component/StockAnalysis";
import ProductList from "./component/ProductList";
import CustomerAccount from "./component/CustomerAccount";
import CustomerHistory from "./component/CustomerHistory";
import SupplierData from "./component/SupplierData";
import Navbar from "./component/navbar";
import Footer from "./component/footer"; // Import the Footer component
import Notes from "./component/Notes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute to protect routes that need authentication
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* RefreshHandler will check authentication on page reload */}
      <RefreshHandler setisAutheticate={setIsAuthenticated} />
      
      {/* Navbar with authentication props */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      {/* Main content area */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setisAutheticate={setIsAuthenticated} />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Routes (accessible only when authenticated) */}
          <Route path="/home" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/billgenerator" element={<PrivateRoute element={<BillGenerator />} />} />
          <Route path="/showbills" element={<PrivateRoute element={<ShowBill />} />} />
          <Route path="/stockanalysis" element={<PrivateRoute element={<StockAnalysis />} />} />
          <Route path="/productlist" element={<PrivateRoute element={<ProductList />} />} />
          <Route path="/inventorymanager" element={<PrivateRoute element={<InventoryManager />} />} />
          <Route path="/customeraccount" element={<PrivateRoute element={<CustomerAccount />} />} />
          <Route path="/customer/:customerId" element={<PrivateRoute element={<CustomerHistory />} />} />
          <Route path="/supplierData" element={<PrivateRoute element={<SupplierData />} />} />
          <Route path="/notes" element={<PrivateRoute element={<Notes/>} />} />
        </Routes>
      </main>
    </div>
  );
}
 
export default App;


