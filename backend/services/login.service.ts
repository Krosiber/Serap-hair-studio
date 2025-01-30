import { User } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcryptjs"
export const loginService = async (username: string, password: string) => {
    const user = await User.findOne({username})

    if(!user){
        throw new Error("User not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
        throw new Error("Password is incorrect")
    }

    const userPayload = {
        username:user.username
    }

    const accessToken = generateToken(userPayload)

    return {accessToken}
}
