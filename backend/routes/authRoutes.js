import express from "express";
import AuthController from "../controllers/AuthController.js";
import AuthValidation from "../Middleware/AuthValidation.js"; // use correct case


const router = express.Router();

const {signup,login}=AuthController;
const {signupValidation,loginValidation}=AuthValidation;



router.post('/sign-up', signupValidation, signup);

router.post('/login', loginValidation, login);



export default router;
