import mongoose from "mongoose";


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,      
    },
    password:{
        type:String,
        required: function() {
            return !this.googleId; // Only require password if it's not a Google OAuth user
          }
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    }
},
{timestamps:true}
)


const User=mongoose.model("User",userSchema)

export default User;