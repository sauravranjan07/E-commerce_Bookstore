import mongoose from "mongoose";
const order = new mongoose.Schema({
  name:{type:String,required:true},
  price: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  book: { type: mongoose.Types.ObjectId, ref: "book", required: true },
  address: { type: String, required: true },
  quantity: { type: Number, required: true },
  payment_method: { type: String, required: true, default: "COD" },
  status: { type: Boolean, default: false },
},{timestamps:true});

const orderSchema=mongoose.model("order",order)
export{orderSchema}
