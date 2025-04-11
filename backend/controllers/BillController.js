import Product from "../models/Product.js";
import Bill from "../models/Bill.js";




export const CreateBill = async (req, res) => {
    const owner = req.user.email; // Get the authenticated user's email

    try {
        const { customerName, phoneNumber, deposit = 0, customerId, items } = req.body;

        // Generate bill number
        const billNumber = `BILL-${Date.now()}`;

        // Calculate grand total and net quantity
        let grandTotal = 0;
        let netQuantity = 0;

        for (const item of items) {
            // Fetch product by ID and owner
            const product = await Product.findOne({ _id: item.productId, owner });
            if (product) {
                if (product.quantity < item.quantity) {
                    return res.status(400).json({ message: `Not enough stock for ${product.name}` });
                }

                // Update grand total and net quantity
                grandTotal += item.price * item.quantity;
                netQuantity += item.quantity;

                // Update product quantity
                product.quantity -= item.quantity;
                await product.save();
            } else {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
        }

        // Create new bill with initial history entry if deposit exists
        const bill = new Bill({
            owner,
            customerName,
            phoneNumber,
            deposit,
            customerId,
            billNumber,
            items,
            grandTotal,
            netQuantity,
            date: new Date(),
            history: deposit > 0 ? [{
                date: new Date(),
                depositHistory: deposit,
                paymentMethod: 'Cash' // Default payment method
            }] : []
        });

        await bill.save();

        res.status(201).json(bill);
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const GetBill = async (req, res) => {
    const owner = req.user.email; // Get the authenticated user's email
    try {
        const data = await Bill.find({ owner }); // Fetch bills associated with the owner
        if (data.length > 0) { // Check if any bills exist
            res.status(200).json(data); // Return bills as JSON
        } else {
            res.status(404).json({ message: "No bills found for this user" }); // More informative message
        }
    } catch (error) {
        console.error('Error fetching bills:', error); // Log error for debugging
        res.status(500).json({ message: "Server Error", error });
    }

};


export const UpdateBill = async (req, res) => {


    const { billId } = req.params;
    const { history } = req.body;

    try {
        const bill = await Bill.findById(billId);  // Simplified findById call

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        bill.deposit += history; // Update deposit amount

        const newHistoryEntry = {
            date: history.date || new Date(),
            depositHistory: history || 0,
            paymentMethod: history.paymentMethod || 'Cash'
        };

        bill.history.push(newHistoryEntry);
        await bill.save();

        res.status(200).json({
            message: "History updated successfully",
            bill
        });

    } catch (error) {
        console.error("Error updating customer history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

