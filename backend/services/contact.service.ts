import { Contact } from "../models/contact";
import geoip from "geoip-lite";

interface IUser {
    name: string;
    surname: string;
    phone: number;
    email: string;
    message: string;
}

export const contactService = async (userdata: IUser, ip: string) => {
    try {
    
        const geo = geoip.lookup(ip);

      
        const location = geo ? {
            country: geo.country,
            region: geo.region,
            city: geo.city,
            latitude: geo.ll ? geo.ll[0] : "Unknown latitude",
            longitude: geo.ll ? geo.ll[1] : "Unknown longitude",
            timezone: geo.timezone || "Unknown timezone",
        } : "Unknown location";

        const { name, surname, phone, email, message } = userdata;
        const form = new Contact({
            name,
            surname,
            phone,
            email,
            message,
            ip,
            location
        });

        await form.save();
        return { message: "Form successfully submitted", location };
    } catch (error) {
        console.error(error);
        return { message: "An error occurred" };
    }
};
