import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


await mongoose.connect(process.env.MONGO_URL)
      .then(()=>{
        console.log('mongodb connected successfully');        
      })
      .catch((error)=>{
        console.log('Error Occured in mongodb Connection',error);
        
})