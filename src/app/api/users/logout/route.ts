
import { NextRequest, NextResponse } from "next/server"



export async function GET(request: NextRequest) {
    try {
       
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        })

        response.cookies.set("token", "token", {
            httpOnly: true,
            expires:new Date(0)
        })
        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.messagte }, { status: 500 })
    }
}
