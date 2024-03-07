import mongoose, { ConnectOptions } from 'mongoose'
let DB_URL=`mongodb+srv://ranjansaurav07:Saurav123@cluster0.4r2jxrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
async function createConnection():Promise<string |undefined>{
    const connection=await mongoose.connect(DB_URL,{
    } as ConnectOptions)
    if(connection){
       return "connected"
    }
}
export{createConnection}