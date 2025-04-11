import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();


const otpStorage = {}; // Format: { phoneNumber: { otp: '1234', expires: Date } }

// Send OTP


export const SendOtp =async(req,res)=>{
    const { phoneNumber } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate OTP
  
    // Store OTP and expiration time (1 minute)
    otpStorage[phoneNumber] = {
      otp,
      expires: Date.now() + 60000 // 1 minute from now
    };
  
    // Send OTP via Twilio
    client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: `+91${phoneNumber}`,
    })
    .then(() => {
      res.status(200).json({ message: 'OTP sent successfully!' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to send OTP' });
    });

};

export const ManageProfile=async(req,res)=>{
  
    const { phoneNumber, otp, businessName } = req.body;
    const owner=req.user.email;
  
    // Check if OTP exists for the phone number
    const otpData = otpStorage[phoneNumber];
  
    if (!otpData) {
  
      return res.status(400).json({ message: 'OTP not generated or expired.' });
    }
  
    // Check if OTP is valid and not expired
    if (otpData.otp === otp && Date.now() < otpData.expires) {
  
      const updatedUser = await User.findOneAndUpdate(
        {email :owner}, 
        { phoneNumber, name: businessName }, 
        { new: true, runValidators: true } 
      );
          
    res.status(200).json({ message: 'Profile updated successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid OTP or Phone Number' });
    }

};




