import { findUserByEmail} from "./user.service.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken, verifyToken } from "../utils/jwt.js";


//Login API 

export const loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await comparePassword(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const token = generateToken(user.id);
        return res.status(200).json({message: "Login successful" , token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// Logout

export const logoutUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

