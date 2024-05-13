import express from "express";
const orderRouter = express.Router();
import { adminAuthMiddleware, userAuthMiddleware } from "../middlewares/user-auth-middleware";
import {
  createOrder,
  deleteMyOrder,
  getMyOrder,
  getAllOrders

} from "../controllers/orderController";
orderRouter.post("/placeorder",userAuthMiddleware, createOrder);
orderRouter.get("/myorders", userAuthMiddleware, getMyOrder);
orderRouter.delete("/delete/:id", userAuthMiddleware, deleteMyOrder);
orderRouter.get('/allorders',adminAuthMiddleware,getAllOrders)
export { orderRouter };
