import express from "express";
import ensureAutheticate from "../Middleware/auth.js";
import { ManageProfile,userProfile } from "../controllers/ProfileController.js";


const router = express.Router();

router.post('/manage-profile', ensureAutheticate,ManageProfile);
router.get('/profile', ensureAutheticate,userProfile);

export default router;

