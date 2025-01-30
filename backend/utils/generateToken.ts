import jwt from "jsonwebtoken"
import env from "../config/env"


export const generateToken=(userPayload:{username:string}):string =>{
    return jwt.sign(userPayload,env.ACCESS_TOKEN,{expiresIn:"20m"})
}
