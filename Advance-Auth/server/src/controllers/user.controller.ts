import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto"
import { generateVerificationCode } from "../utils/generateVerificationToken";
import generateTokenAndSetCookie from "../middlewares/generateTokenAndSetCookie";
import { AuthRequest } from "../types/express";

export const signup = async (req: Request, res: Response) => {
    try {
        let { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: "All files are required" })
        }
        email = email.toLowerCase().trim();
        const Existuser = await User.findOne({ email })
        if (Existuser) {
            return res.status(400).json({ success: false, message: "User Already Exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 20)
        const code = generateVerificationCode()
        const tokenExpires = new Date(Date.now() + 60 * 60 * 1000);
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            lastLogin: Date.now(),
            verificationToken: code,
            verificationTokenExpiresAt: tokenExpires,

        })
        await user.save()

        generateTokenAndSetCookie(res, user._id);
        // await SendVerficationEamil(email , code);

        return res.status(200).json({ success: true, message: "User created successfully", user: { ...user, password: undefined } })
    } catch (error) {
        console.log("Error in signup function : ", error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try {
        let { code } = req.body;
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: new Date() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired verfication code" })
        }
        user.isVerified = true;
        user.verificationToken = '0';
        user.verificationTokenExpiresAt = new Date(0);
        await user.save()
        // await sendWelcomeEmail(user.email , user.fullname)
        const userObj = await User.findById(user._id).select("-password")
        return res.status(201).json({ success: true, message: "Verified Successfully", })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        email = email.toLowerCase().trim();
        const isExist = await User.findOne({ email })
        if (!isExist) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }

        const isCorrect = bcrypt.compare(password, isExist.password);
        if (!isCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentails" })
        }
        if (!isExist.isVerified) {
            return res.status(400).json({ success: false, message: "User Not Verified" })
        }
        generateTokenAndSetCookie(res, isExist._id);
        // Send Welcome Email
        isExist.lastLogin = new Date()
        await isExist.save()
        return res.status(200).json({
            success: true, message: "Logged in successfully", user: {
                ...isExist,
                password: undefined
            }
        })
    } catch (error) {
        console.log("Error in login function :", error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ success: true, message: "Logout succesfully" })
    } catch (error) {
        console.log("Error in logout fucution : ", error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        let { email } = req.body;
        email = email.toLowerCase().trim()
        if (!email) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User Does Not Exist" })
        }
        const code: string = crypto.randomBytes(20).toString("hex")
        const codeExpireDate = new Date(Date.now() + 60 * 60 * 1000);

        user.forgotPasswordToken = code;
        user.forgotPasswordTokenExpiresAt = codeExpireDate;
        await user.save()

        // Send Email
        // await sendPasswordResetEmail(user.email , `${process.env.CLIENT_URL}/reset-password/${code}`)

        return res.status(201).json({ success: true, message: "Password reset email has sent successfully on your Email" })
    } catch (error) {
        console.log("Error in forgot password function : ", error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const {newPassword} = req.body;
        if (!newPassword || !token) {
            return res.status(400).json({ success: false, message: "Either new password or token is missing " })
        }
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expire reset token" })
        }
        // update password
        const newHashedPassword = await bcrypt.hash(newPassword, 20);
        user.password = newHashedPassword;
        user.forgotPasswordToken = '0';
        user.forgotPasswordTokenExpiresAt = new Date(0)
        await user.save()

        // sendresetpasswordsuccessemail
        return res.status(200).json({ success: true, message: "Password Reset Successfully" })
    } catch (error) {
        console.log("Error in resetPassword function : ", error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const checkAuth = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log("Error in check auth function : ", error)
        return res.status(500).json({ success: false, message: error })
    }
}