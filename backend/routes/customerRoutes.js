import express from "express"   
import ensureAuthenticate from "../Middleware/auth.js"
import { addCustomer,showCustomer } from "../controllers/CustomerController.js"

const router = express.Router()


router.post('/add', ensureAuthenticate, addCustomer);
router.get('/all', ensureAuthenticate, showCustomer);



export default router;

