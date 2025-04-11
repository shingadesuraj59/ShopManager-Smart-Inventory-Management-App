import express from "express"
import cors from "cors"
import 'dotenv/config'
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes.js"
import inventoryRoutes from './routes/inventoryRoutes.js';
import billRoutes from './routes/billRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";
import  productRoutes from "./routes/productRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
import supplierRoutes  from "./routes/supplierRoutes.js"
import "./controllers/dbController.js";




const app = express()
const port = process.env.PORT || 3000;




app.use(bodyParser.json());
app.use(cors());
app.use("/api",authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/bill', billRoutes);
app.use('/api',profileRoutes)
app.use('/api',productRoutes)
app.use('/api/customer',customerRoutes)
app.use('/api/supplier',supplierRoutes)


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})