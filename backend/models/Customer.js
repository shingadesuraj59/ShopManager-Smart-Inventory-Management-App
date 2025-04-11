import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  owner:{type:String ,required:true},  //userid each user have there own data  
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:String
  },
  
   
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Customer= mongoose.model("Customer", customerSchema);

export default Customer;