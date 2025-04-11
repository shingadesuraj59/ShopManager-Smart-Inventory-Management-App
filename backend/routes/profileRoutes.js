import express from "express";
import ensureAutheticate from "../Middleware/auth.js";
import { ManageProfile,SendOtp } from "../controllers/ProfileController.js";


const router = express.Router();


router.post('/profile/send-otp', ensureAutheticate,SendOtp);

// Verify OTP
router.post('/profile/verify-otp', ensureAutheticate,ManageProfile);

export default router;

