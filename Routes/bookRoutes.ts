import express from 'express'
const bookRouter=express.Router()
import {createBook, deleteBookById, findBookByCategory, getAllBooks} from '../controllers/bookController'
import { userAuthMiddleware } from '../middlewares/user-auth-middleware'

bookRouter.post('/addbook',createBook)
bookRouter.get('/allbooks',getAllBooks)
bookRouter.delete("/deletebook/:id",userAuthMiddleware,deleteBookById)
bookRouter.get("/getbookbycategory/:id",findBookByCategory)
export{bookRouter}