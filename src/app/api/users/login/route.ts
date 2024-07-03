import { connect } from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import * as jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        console.log("here at start")
        const reqBody = await request.json()
        const {email, password } = reqBody
        console.log("here at backend",reqBody)
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User doesn't Exists" }, { status: 400 })
        }

        const validatePassword = await bcryptjs.compare(password, user.password)


        if (!validatePassword) {
            return NextResponse.json({ error: "Password Provided is wrong" }, { status: 400 })
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "User Logged in successfully",
            success: true,
            isVerified:user.isVerified
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
