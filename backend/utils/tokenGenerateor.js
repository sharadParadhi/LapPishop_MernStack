import jwt from "jsonwebtoken";

const tokenGenerator=(req,res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:req.body.remember?365*24+'h':'24h'
    })
    
     // Setting the JWT as an HTTP-only cookie for enhanced security
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    // secure:false,
    sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
    maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  });

  return token;

  
}

export default tokenGenerator;