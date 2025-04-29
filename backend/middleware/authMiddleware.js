import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        console.log("token in auth",req.cookies)
        if(!token){
            res.statusCode=401;
            throw new Error("Authenctication failed, Token not Provided")
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodeToken){
            res.statusCode=401;
            throw new Error("Authenctication failed: Invaid token")
        };
        req.user =await User.findById(decodeToken.userId).select('-password')
        next()
    }catch(err){
        next(err)
    }
}

const admin =async(req,res,next)=>{
    try{
        if(!req.user || !req.user.isAdmin){
            res.statusCode=401;
            throw new Error("Authorization failed : You are not authorized.")
        }

    }catch(err){
        next(err)
    }
}

export {auth,admin}