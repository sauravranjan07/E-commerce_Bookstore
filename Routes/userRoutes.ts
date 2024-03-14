import express from 'express'
const userRouter=express.Router()
import {registerUser,getAllUusers, deleteUserById,loginUser} from '../controllers/userController'
import {userAuthMiddleware} from '../middlewares/user-auth-middleware'


userRouter.post('/signup',registerUser)
userRouter.get('/allusers',getAllUusers)
userRouter.delete("/delete/:id",userAuthMiddleware,deleteUserById)
userRouter.post("/login",loginUser)
export{userRouter}