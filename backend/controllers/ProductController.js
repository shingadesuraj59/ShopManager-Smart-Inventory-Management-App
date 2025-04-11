import Product from "../models/Product.js";



export const ShopProduct=async(req,res)=>{
    const owner = req.user.email;
    
    try {
        const productdata = await Product.find({ owner });
        if (!productdata) {
            return res.status(404).json({ message: "No products found" });  
        }
        res.status(200).json(productdata);
    } catch (error) {
        res.status(500).json({
            message: "Server error occurred",
            error
        });
    }
}


