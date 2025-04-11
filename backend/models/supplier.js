import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    supplierName: {
        type: String,
        required: true
    },
    totalPayment: {
        type: String,
        required: true,
    },
    depositAmount: {
        type: String,
        required: true,
    },
    Date: {
        type: String
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Supplier = mongoose.model("supplier", supplierSchema);

export default Supplier;

