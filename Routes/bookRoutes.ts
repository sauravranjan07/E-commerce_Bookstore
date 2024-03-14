import express from 'express'
const bookRouter=express.Router()
import {createBook, deleteBookById, findBookByCategory, getAllBooks} from '../controllers/bookController'
import { userAuthMiddleware,adminAuthMiddleware } from '../middlewares/user-auth-middleware'

bookRouter.post('/addbook',adminAuthMiddleware,createBook)
bookRouter.get('/allbooks',getAllBooks)
bookRouter.delete("/deletebook/:id",adminAuthMiddleware,deleteBookById)
bookRouter.get("/getbookbycategory/:id",findBookByCategory)
export{bookRouter}