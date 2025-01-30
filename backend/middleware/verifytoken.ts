import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  env  from "../config/env";

interface User{
    username:string,
    password:string
}

declare global {
    namespace Express {
        interface Request {
            user?: User; // Burada User, sizin kullanıcı modelinize karşılık gelmeli
        }
    }
}


export const verifyToken =(req:Request,res:Response,next:NextFunction):void=>{
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return
    }


    jwt.verify(token,env.ACCESS_TOKEN,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"gecersiz token"})
        }
        req.user= decoded as User
        
        next()
    })
}