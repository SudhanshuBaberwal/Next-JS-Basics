import { Response } from "express";
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res: Response, userId: string | undefined) => {
    if (!process.env.JWT_SECRET) {
        console.log("JWT SECRET is not define")
        return;
    }
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
    } catch (error) {
        console.log("Error in set Cookie Function : ", error)
        process.exit(1)
    }
}

export default generateTokenAndSetCookie;