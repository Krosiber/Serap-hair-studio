import { Request,Response } from "express"
import { commentService } from "../services/comment.service"
import { Star } from "../models/comment"
import { likeComment } from "../services/comment.service"

interface IUser {
    name: string,
    surname: string,
    star: string,
    like: number,
    comment: string,


}
export const commentController = async(req:Request,res:Response,)=>{
    try {
        const data:IUser = req.body
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        commentService(data, ip  as string)
        res.status(201).json({message:"Created"})
    } catch (error) {
        res.status(500).json({message:error})
        
    }
}


export const getcomment = async(req:Request,res:Response)=>{
    try {
        const response = await Star.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error})
        
    }
}

export const likeCommentController = async (req: Request, res: Response) => {
    try {
        const comment = await likeComment(req.params.id);
        res.json(comment);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        await Star.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Yorum başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};