import express from 'express'
const orderRouter=express.Router()
import {userAuthMiddleware} from '../middlewares/user-auth-middleware'
import {createOrder,getMyOrder} from "../controllers/orderController"
orderRouter.post('/placeorder',createOrder)
orderRouter.get('/myorder',userAuthMiddleware,getMyOrder)
export{orderRouter}