import express from "express"   
import ensureAuthenticate from "../Middleware/auth.js"
import { addCustomer,showCustomer } from "../controllers/CustomerController.js"
import { addSupplier } from "../controllers/SupplierController.js"
import  {upload}  from "../Middleware/multer.js"
const router = express.Router()


router.post('/add', ensureAuthenticate, addCustomer);
router.get('/all', ensureAuthenticate, showCustomer);
router.post('/supplier-data',upload.single('image'),addSupplier)


export default router;

