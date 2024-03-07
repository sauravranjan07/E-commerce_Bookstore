import mongoose from 'mongoose'
const book=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    publishDate:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category",
        required:true
    }
},{timestamps:true})
const bookSchema=mongoose.model("book",book)
export{bookSchema}