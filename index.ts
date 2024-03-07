import express,{Express,Response,Request} from 'express'
import {createConnection} from './Database/connection'
import morgan  from "morgan"
const app:Express=express()
app.use(morgan('dev'))

app.listen(3000,async():Promise<any>=>{
   let result:string|undefined= await createConnection()
    if(result){
        console.log(`I am ${result} and working on port 3000`)
    }
   
})
app.get('/',(req:Request,resp:Response)=>{
    resp.send({message:"helooo im working on 3000"})
})