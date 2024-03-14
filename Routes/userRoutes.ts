import express from 'express'
const userRouter=express.Router()
import {registerUser,getAllUusers, deleteUserById,loginUser} from '../controllers/userController'
import {userAuthMiddleware,adminAuthMiddleware} from '../middlewares/user-auth-middleware'


userRouter.post('/signup',registerUser)
userRouter.get('/allusers',adminAuthMiddleware,getAllUusers)
userRouter.delete("/delete/:id",adminAuthMiddleware,deleteUserById)
userRouter.post("/login",loginUser)
export{userRouter}