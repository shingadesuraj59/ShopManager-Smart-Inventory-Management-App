import Usermodel from "../models/User.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"



const signup=async(req,res)=>{
    try{
        const {name,email,password,phoneNumber}=req.body;
         
        const user=await Usermodel.findOne({email});

        if(user){
           return res.status(409).json({
               message:"User is already exist , you can login",
               success:false
            })

        }

        const createuser=new Usermodel({
            name,email,password,phoneNumber
        })
        createuser.password=await bcrypt.hash(password,10);
        await createuser.save();

        res.status(200).json({
            message:"User sign-up Successfully",
            success:true
        })

    }
    catch(error){
        res.status(500).json({
            message:"server side Error Occured during sign-up",
            success:false
        })

    }


}
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await Usermodel.findOne({ email });

    // If user is not found, send error response
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Compare password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password does not match, send error response
    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "Incorrect password",
        success: false,
      });
    }
   
    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id }, 
        process.env.JWT_SECRET, 
      { expiresIn: "24h" } 
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwttoken,
      email,
      name:user.name
    
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: "Server error occurred during login",
      success: false,
      error: error.message,
    });
  }
};

export default {signup,login};