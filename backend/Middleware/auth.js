import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const ensureAutheticate=async(req,res,next)=>{
    const auth =req.header("Authorization")

    if(!auth){
        return res.status(403).json({
            message:"unauth0rized, jwt token is undefined"
        })
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET) //process.env.secret
        req.user=decoded;
        next();
        
    }
    catch{
        return res.status(200).json({
            message:"unauth0rized, jwt token expired  or wrong"
        })
    }
}

export default ensureAutheticate;