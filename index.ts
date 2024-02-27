import express,{Express,Response,Request} from 'express'
const app:Express=express()

app.listen(3000,()=>{
    console.log(`helooo working on port 30000`)
   
})
app.get('/',(req:Request,resp:Response)=>{
    resp.send({m:"helooo im working on 3000"})
})