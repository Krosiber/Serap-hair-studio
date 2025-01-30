import "dotenv/config"
import { cleanEnv, port, str } from "envalid"
export default cleanEnv(process.env,{
    MONGODB:str(),
    PORT:port(),
    ACCESS_TOKEN:str()
})