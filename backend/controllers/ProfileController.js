import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();




export const ManageProfile=async(req,res)=>{

  try {
     const { phoneNumber, businessName } = req.body;
    const owner=req.user.email;

    console.log(phoneNumber, businessName, owner);

      const updatedUser = await User.findOneAndUpdate(
        {email :owner}, 
        { phoneNumber, name: businessName }, 
        { new: true, runValidators: true } 
      );

      console.log("up",updatedUser);
      
      if(!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
          
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }


};


export const userProfile=async(req,res)=>{
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
}

