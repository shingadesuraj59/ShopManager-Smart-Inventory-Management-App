// models/Bill.js

import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    owner: { type: String, required: true },  // userid - each user has their own data
    customerName: { type: String, required: true },
    billNumber: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    phoneNumber: { type: String },
    deposit: { type: Number, default: 0 },
    customerId: { type: String },
    items: [{
        productName: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    grandTotal: { type: Number, required: true },
    netQuantity: { type: Number, required: true },
    history: [{
        date: { type: Date, default: Date.now },
        depositHistory: { type: Number, default: 0 },
        paymentMethod: { 
            type: String, 
            enum: ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'], 
            default: 'Cash' 
        },
    }],
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
