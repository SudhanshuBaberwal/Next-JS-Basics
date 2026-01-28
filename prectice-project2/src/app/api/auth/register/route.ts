import connnectDB from "@/lib/DB";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()
        await connnectDB()

        let existUser = await User.findOne({ email })
        if (existUser) {
            return NextResponse.json({ message: "User Already Exist!" }, { status: 400 })
        }
        if (password.length < 6) {
            return NextResponse.json({ message: "Password Must be atleast 6 Characters" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            message: "Error in Register Function : ", error
        }, { status: 500 })
    }

}