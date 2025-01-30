import { Request, Response } from "express"
import { loginService } from "../services/login.service"


export const loginController = async (req:Request,res:Response)=>{
    try {
        const {username,password} = req.body

        const {accessToken} = await loginService(username,password)


        res.cookie(`accessToken`,accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:`lax`,
            maxAge:20 * 60 * 1000

            
        })
        res.status(200).json({
            success: true,
            token: accessToken,
            message: 'Giriş başarılı'
        });
    } catch (error) {
        res.status(500).json({message:"Login failed"})
        
    }
}
