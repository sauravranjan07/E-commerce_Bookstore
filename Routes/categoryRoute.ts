import express from 'express'
const categoryRouter=express.Router()
import {createCategory,getAllCategory,deleteCategoryById} from '../controllers/categoryControllers'
import { adminAuthMiddleware } from '../middlewares/user-auth-middleware'


categoryRouter.post('/add',adminAuthMiddleware,createCategory)
categoryRouter.get('/getcategories',getAllCategory)
categoryRouter.delete('/deletecategory/:id',adminAuthMiddleware,deleteCategoryById)

export{categoryRouter}