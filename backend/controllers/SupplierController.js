import Supplier from "../models/supplier.js";
import path from "path"
import { uploadOnCloudinary } from "../config/cloudinary.js";

// Correct controller function signature
const addSupplier = async (req, res) => {  // Make sure to include req and res parameters
  try {
    const owner = req.user.email
    const { supplierName, totalPayment, depositAmount, date } = req.body;
    const imageFile = req.file.path;

    

    if (!supplierName || !totalPayment || !date) {
      return res.status(400).json({  // Now res is defined
        success: false,
        message: 'Supplier name, total payment, and date are required fields'
      });
    }


    // Upload image to Cloudinary
    const imageUpload = await uploadOnCloudinary(imageFile);
    if (!imageUpload || !imageUpload.secure_url) {
      return res.status(500).json({ success: false, message: "Failed to upload image" });
    }

    const imageUrl = imageUpload.secure_url;

    console.log("Image URL:", imageUrl); // Log the image URL for debugging

    const supplierData = new Supplier({
      owner,
      supplierName: supplierName,
      totalPayment: parseFloat(totalPayment),
      depositAmount: parseFloat(depositAmount || 0),
      Date: new Date(date),
      imageUrl:imageUrl
    });



    await supplierData.save();

    return res.status(201).json({  // Proper response
      success: true,
      message: "Supplier added successfully",
      data: supplierData
    });

  } catch (error) {
    console.error('Error adding supplier:', error);
    return res.status(500).json({  // Error response
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

const getSupplier = async (req, res) => {
  try {
    const owner = req.user.email;

    // Corrected the find query to search by owner field
    const suppliers = await Supplier.find({ owner });

    return res.status(200).json({
      success: true,
      count: suppliers.length,  // Added count of suppliers
      suppliers
    });

  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch suppliers'
    });
  }
};

// Export both functions together
export { addSupplier, getSupplier };