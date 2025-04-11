import Product from "../models/Product.js";



export const AddProduct =async(req,res)=>{
    const email = req.user.email; // Get the authenticated user's email

    try {
        const newProduct = new Product({
            ...req.body,
            dateAdded: Date.now(),
            dateUpdated: Date.now(),
            owner: email, // Assign the owner of the product
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};


export const ProductList =async(req,res)=>{
    const email = req.user.email; // Get the authenticated user's email
    try {
        const { search } = req.query;
        let query = { owner: email }; // Filter products by owner's email

        if (search) {
            query = {
                owner: email, // Ensure we are still filtering by owner
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                    { supplier: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


export const DeleteProduct = async (req, res) => {
    const email = req.user.email; 
    try {
        const { id } = req.params;
        

        const deletedProduct = await Product.findOneAndDelete({ _id: id, owner: email });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found or unauthorized' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const UpdateProduct =async(req,res)=>{
    const email = req.user.email; // Get the authenticated user's email
    try {
        const { id } = req.params;
        const { quantity, actualPrice, sellingPrice } = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: id, owner: email }, 
            {
                quantity: parseInt(quantity),
                actualPrice: parseFloat(actualPrice),
                sellingPrice: parseFloat(sellingPrice),
                dateUpdated: Date.now(),
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};