// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    owner:{type:String ,required:true},
    name: { type: String, required: true },
    category: { type: String, required: true },
    actualPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    supplier: { type: String, required: true },
    expirationDate: { type: Date },
    dateAdded: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

productSchema.pre('save', function(next) {
    this.dateUpdated = Date.now();
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;