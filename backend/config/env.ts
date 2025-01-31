import "dotenv/config"
import { cleanEnv, port, str } from "envalid"
export default cleanEnv(process.env,{
    MONGODB:str(),
    PORT:port(),
    ACCESS_TOKEN:str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str()
})