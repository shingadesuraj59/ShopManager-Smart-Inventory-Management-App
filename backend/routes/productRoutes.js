import express from "express";
import ensureAuthenticate from "../Middleware/auth.js";
import { ShopProduct } from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", ensureAuthenticate,ShopProduct);

export default router;
