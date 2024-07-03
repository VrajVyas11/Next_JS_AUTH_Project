import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        const user = await User.findOne({ forgotpasswordToken: token, 
            // forgotpasswordTokenExpiry: { $gt: Date.now() } 
        })

        if (!user) {
            return NextResponse.json({ error: "Invald Token" }, { status: 400 })
        }

        console.log(user)

        await user.save()

        return NextResponse.json({
            message: "password Token is Verified Successsfully",
            success: true
        })
    } catch (error: any) {

    }
}