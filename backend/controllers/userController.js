import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import tokenGenerator from "../utils/tokenGenerateor.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


const register=async(req,res,next)=>{
    try{
       
        const {name,email,password}=req.body;
        const existUser=await User.findOne({email});
        
        if(existUser){
            res.statusCode=409;
            res.json({message:"User is already exist. Please try to different email"})
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            password:hashedPassword,
            name,
            email
        })
        await newUser.save()
        tokenGenerator(req,res,newUser._id)
        res.status(201).json({
            message:`Registration successfull. Welcome${name}`,
            userId:newUser._id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin
        });
    }catch(err){
        next(err)
    }
}

const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const existUser=await User.findOne({email});
        if(!existUser){
            res.statusCode=401;
            throw new Error("Email not found, Please register first!")
        }

        const checkPassword=await bcrypt.compare(password,existUser.password)
        if(!checkPassword){
            res.statusCode=401;
            res.json({message:"Invalid passowd, Please check your password and try again."})
        }
        const token=tokenGenerator(req,res,existUser._id)
       
        res.status(200).json({
            message:"Login Suceessfull",
            userId:existUser._id,
            name:existUser.name,
            email:existUser.email,
            isAdmin:existUser.isAdmin,
            token
        })

    }catch(err){
        next(err.message)
    }
}

const logout=async(req,res)=>{
    res.clearCookie("jwt",{httpOnly:true});
    res.status(200).json({ message: 'Logout successful' });
}


const resetPasswordReq=async(req,res,next)=>{
    try{
        const {email}=req.body;
        const existUser=await User.findOne({email});
        if(!existUser){
            res.statusCode=404;
            res.json({message:"User not Exist"})
        }
        const token=tokenGenerator(req,res,existUser._id);
        const passwordResetLink=`${process.env.FRONTEND_URL}/${existUser._id}/${token}`

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASSWORD
            }
        })

        const mailOption={
            from:process.env.EMAIL,
            to:email,
            subject:"Password Reset Request",
            text:`Hello, Plese use the following link to reset your password: ${passwordResetLink}`,
            html:`<p>Hello,</p><p>Please click on the link below to reset your password:</p><a href="${passwordResetLink}">${passwordResetLink}</a>`, // HTML version
        }

        await transporter.sendMail(mailOption)
        res.status(200).json({message:"password reset link sent successfully. check your email"})

    }catch(err){
        next(err)
    }
}


const resetPassword=async(req,res,next)=>{
    try{
        const {password}=req.body;
    const {id:userId,token}=req.params;
    console.log("id",userId)
    const user=await User.findById(userId);
    console.log("user request to reset passwrod-",user)
    const decodeToken= await jwt.verify(token,process.env.JWT_SECRET);
    if(!decodeToken){
        res.statusCode=401;
        res.json({message:"Invalid or expired token"})
    };
    const hashedPassword=await bcrypt.hash(password,10);
    user.password=hashedPassword;
    await user.save();
    res.status(200).json({message:"Password reset sucessfully. please login!"})
    }catch(err){
        next(err)
    }
}


const updateProfile=async(req,res,next)=>{
    console.log("coming i n api")
    try{
        const {name,email, password}=req.body;
        const user =await User.findById(req.user._id);
        if(!user){
            res.statusCode=404;
            // throw new Error('User not found. Unable to update profile')
            res.json({message:"User not found. Unable to update profile"})
        }
        user.name=name || user.name;
        user.email=email || email;
        if(password){
            const hashedPassword=await bcrypt.hash(password,10);
            user.password=hashedPassword;
        }

        const updatedUser=await user.save()
        res.status(200).json({
            message: 'User profile updated successfully.',
            userId: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
          });

    }catch(err){
        next(err);
    }
}




export {register,login,logout,resetPasswordReq,resetPassword,updateProfile}