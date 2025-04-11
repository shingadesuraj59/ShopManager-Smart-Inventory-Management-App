import Customer from "../models/Customer.js";

const addCustomer = async (req, res) => {

    try {
        const {customerName,phoneNumber}=req.body;
        const owner = req.user.email; // Get the authenticated user's email
        
        if(!customerName || !phoneNumber) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const customer = new Customer({
            owner,
            customerName,
            phoneNumber
        });

        await customer.save();

        res.status(201).json({
            message: "Customer created successfully",
            customer
        });



    } catch (error) {
        console.error("Error creating customer:", error); // Log error for debugging
    }
}


const showCustomer=async (req, res) => {
    const owner = req.user.email; // Get the authenticated user's email
    try {
        const customerData = await Customer.find({ owner });
      
        res.status(200).json(customerData);
    } catch (error) {
        console.error("Error fetching customer data:", error); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export {addCustomer,showCustomer};