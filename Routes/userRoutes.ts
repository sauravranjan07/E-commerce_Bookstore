import express from 'express'
const userRouter=express.Router()
import {registerUser,getAllUusers, deleteUserById,loginUser} from '../controllers/userController'


userRouter.post('/signup',registerUser)
userRouter.get('/allusers',getAllUusers)
userRouter.delete("/delete/:id",deleteUserById)
userRouter.post("/login",loginUser)
export{userRouter}