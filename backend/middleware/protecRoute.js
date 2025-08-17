import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) =>{
    try {
        // console.log(req.cookies); // used this for debugging. 
        const token = req.cookies.jwt; // used cookie instead of cookies by mistake and it created a headache
        if(!token){
            return res.status(401).json( {error : "Unauthorized - No Token Provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET); // can give false or a value;
        if(!decode){
            return res.status(401).json( {error : "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decode.userId).select("-password"); // returns user object without the password
        
        if(!user){
            return res.status(401).json( {error : "User not found"});
        }

        req.user = user;
        next(); // will basically call the function next to it after execution
        // in this case it will call sendMessage function in message.routes.js where it's been used;
    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export default protectRoute;