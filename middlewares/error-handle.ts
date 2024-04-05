import express,{NextFunction} from "express";
function handleError(err:any,req:express.Request,resp:express.Response,next:NextFunction){
    try{
     if(resp.statusCode===200) resp.status(500)
    resp.json({error:err.message || "somethimg went wrong"})    
    }catch(error){
     next()
    }
 }
 export{handleError}