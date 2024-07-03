import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request:NextRequest){
    try {
        console.log("here at start of signUP")
       const reqBody= await request.json()
    const {username,email,password}=reqBody
    console.log(reqBody)
const user=await User.findOne({email})

if(user){
    return NextResponse.json({error:"User already Exists"},{status:400})
}

const crypt= await bcryptjs.genSalt(10)
const hashedPassword= await bcryptjs.hash(password,crypt)

const newUser=await new User({
    username,
    email,
    password:hashedPassword
})

const savedUser=await newUser.save()
console.log(savedUser)


await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

return NextResponse.json({message:"User created successfully",
    success:true,
    savedUser,
})

} catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}