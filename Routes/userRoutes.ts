import express from 'express'
const userRouter=express.Router()
import {registerUser,getAllUusers} from '../controllers/userController'


userRouter.post('/signup',registerUser)
userRouter.get('/allusers',getAllUusers)
export{userRouter}