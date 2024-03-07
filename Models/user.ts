import mongoose from 'mongoose'
const user=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    repassword:{
        type:String,
        required:true
    }
},{timestamps:true
})
const userSchema=mongoose.model("users",user)
export{userSchema}