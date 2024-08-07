import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {

    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedJwtToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        return decodedJwtToken.id
    } catch (error: any) {
        throw new Error(error.message)
    }

}