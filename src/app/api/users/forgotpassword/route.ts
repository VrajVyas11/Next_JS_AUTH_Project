import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody

        const user = await User.findOne({ forgotpasswordToken: token })

        if (!user) {
            return NextResponse.json({ error: "Invald Token" }, { status: 400 })
        }

        console.log(user)
        const comparePassword = await bcryptjs.compare(password, user.password)
        if (comparePassword) {
            return NextResponse.json({ error: "New Password Can't be the same as Old Password" }, { status: 401 })
        }
        const crypt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, crypt)

        user.password = hashedPassword
        await user.save()

        return NextResponse.json({
            message: "Password Changed Successsfully",
            success: true
        })
    } catch (error: any) {

    }
}