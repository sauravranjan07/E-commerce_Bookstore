import express from 'express'
const bookRouter=express.Router()
import {createBook, deleteBookById, findBookByCategory, getAllBooks} from '../controllers/bookController'

bookRouter.post('/addbook',createBook)
bookRouter.get('/allbooks',getAllBooks)
bookRouter.delete("/deletebook/:id",deleteBookById)
bookRouter.get("/getbookbycategory/:id",findBookByCategory)
export{bookRouter}