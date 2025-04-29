import express from 'express';
import passport from 'passport';


const router=express.Router();


router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureFlash:'/login'}),(req,res)=>{
    res.json({success:true, message:"Login successful via google"})
    res.redirect("/")
})


export default router;