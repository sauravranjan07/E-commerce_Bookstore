import express from 'express'
const orderRouter=express.Router()
import {userAuthMiddleware} from '../middlewares/user-auth-middleware'
import {createOrder,deleteMyOrder,getMyOrder} from "../controllers/orderController"
orderRouter.post('/placeorder',createOrder)
orderRouter.get('/myorder',userAuthMiddleware,getMyOrder)
orderRouter.delete('/delete/:id',deleteMyOrder)
export{orderRouter}