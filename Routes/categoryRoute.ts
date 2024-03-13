import express from 'express'
const categoryRouter=express.Router()
import {createCategory,getAllCategory,deleteCategoryById} from '../controllers/categoryControllers'


categoryRouter.post('/add',createCategory)
categoryRouter.get('/getcategories',getAllCategory)
categoryRouter.delete('/deletecategory/:id',deleteCategoryById)

export{categoryRouter}