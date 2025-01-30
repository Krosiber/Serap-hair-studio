import { Request, Response } from "express"
import { contactService } from "../services/contact.service"
import { Contact } from "../models/contact"


interface IUser {
    name: string,
    surname: string,
    phone: number,
    email: string,
    message: string
}

export const contactController = async (req: Request, res: Response) => {
    try {
        const userdata: IUser = req.body
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const response = contactService(userdata, ip as string)

        res.status(201).json({ reponse:response })



    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getContact = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find(); // En yeni mesajlar üstte
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Veriler yüklenirken hata oluştu' });
    }
};