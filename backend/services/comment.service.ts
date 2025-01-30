import { Star } from "../models/comment"
import geoip from "geoip-lite";
interface IUser {
    name: string,
    surname: string,
    star: string,
    comment: string,
    


}

export const commentService = async (userData: IUser, ip: string) => {
    try {
        const geo = geoip.lookup(ip);

        // Eğer geo verisi varsa, ilgili konum bilgisini al
        const location = geo ? {
            country: geo.country,
            region: geo.region,
            city: geo.city,
            latitude: geo.ll ? geo.ll[0] : "Unknown latitude",
            longitude: geo.ll ? geo.ll[1] : "Unknown longitude",
            timezone: geo.timezone || "Unknown timezone",
        } : "Unknown location";
        const { name, surname, star, comment } = userData

        const user = new Star({
            name, surname, star,  comment, location, ip
        })

        await user.save()


    } catch (error) {
        console.log(error)
        throw error
    }
}

export const likeComment = async (commentId: string) => {
    try {
        const comment = await Star.findById(commentId);
        if (!comment) {
            throw new Error('Yorum bulunamadı');
        }
        
        comment.like = (comment.like || 0) + 1;
        await comment.save();
        
        return comment;
    } catch (error) {
        throw error;
    }
};


