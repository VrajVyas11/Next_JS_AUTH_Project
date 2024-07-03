import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                { new: true, runValidators: true }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotpasswordToken: hashedToken,
                    forgotpasswordTokenExpiry: Date.now() + 3600000
                },
                { new: true, runValidators: true }
            )
        }

        const transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_AUTH_USER,
                pass: process.env.MAILTRAP_AUTH_PASS
            }
        });

        const mailOption = {
            from: "vraj@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
            html: `<p>
            Click 
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
            here
            </a> 
            to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser. <br/>${process.env.DOMAIN}/${emailType === "VERIFY" ?"verifyemail":"verifypassword/token"}?token=${hashedToken}
            </p>`
        }

        const transportEmail = await transport.sendMail(mailOption)
        console.log('Email sent:', transportEmail)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
