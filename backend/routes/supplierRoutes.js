import express from "express"   
import ensureAuthenticate from "../Middleware/auth.js"
import { addSupplier ,getSupplier} from "../controllers/SupplierController.js"
import  {upload}  from "../Middleware/multer.js"


const router = express.Router()


router.post('/supplier-data',upload.single('image'),ensureAuthenticate,addSupplier);
router.get('/suppliers',ensureAuthenticate,getSupplier);

export default router;