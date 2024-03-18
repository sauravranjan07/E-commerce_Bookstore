import express from 'express'
const orderRouter=express.Router()
import {createOrder,getMyOrder} from "../controllers/orderController"
orderRouter.post('/placeorder',createOrder)
orderRouter.get('/myorder/:id',getMyOrder)
export{orderRouter}