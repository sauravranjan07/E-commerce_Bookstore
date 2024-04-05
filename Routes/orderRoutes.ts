import express from 'express'
const orderRouter=express.Router()
import {userAuthMiddleware} from '../middlewares/user-auth-middleware'
import {createOrder,deleteMyOrder,getMyOrder} from "../controllers/orderController"
orderRouter.post('/placeorder',userAuthMiddleware,createOrder)
orderRouter.get('/myorders',userAuthMiddleware,getMyOrder)
orderRouter.delete('/delete/:id',userAuthMiddleware,deleteMyOrder)
export{orderRouter}