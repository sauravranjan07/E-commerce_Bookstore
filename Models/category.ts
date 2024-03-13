import mongoose from 'mongoose'

const category=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const categorySchema=mongoose.model("category",category)
export{categorySchema}