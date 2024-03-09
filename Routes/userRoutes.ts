import express from 'express'
const userRouter=express.Router()
import {registerUser,getAllUusers, deleteUserById} from '../controllers/userController'


userRouter.post('/signup',registerUser)
userRouter.get('/allusers',getAllUusers)
userRouter.delete("/delete/:id",deleteUserById)
export{userRouter}