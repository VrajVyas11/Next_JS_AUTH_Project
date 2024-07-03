import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request:NextRequest){
    try {
        console.log("here at start of validate email")
       const reqBody= await request.json()
    const {email}=reqBody
    console.log(reqBody)
const user=await User.findOne({email})

if(!user){
    return NextResponse.json({error:"User with this Email doesn't exist"},{status:400})
}


await sendEmail({email,emailType:"RESET",userId:user._id})

return NextResponse.json({message:"Token sent successfully",
    success:true,
})

} catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}