"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [allData, setAllData] = useState({ _id: "", isVerified: false, username: "", email: "" })
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logged out successfully")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data.username)
        setAllData(res.data.data)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-900 text-white">
            <div className="bg-gray-800 flex flex-col justify-center items-center shadow-md rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center w-fit h-fit p-3 bg-gray-700 rounded-full mx-auto mb-6">
                    <img className="h-16 w-16 size-fit" src="/user.png" alt="User Icon" />
                </div>
                <h1 className="text-4xl font-bold text-center mb-6">Profile</h1>
                {/* <p className="text-lg text-center  mb-6">Fetch User Details to View Them</p> */}
                {data === "nothing" ? <p className="text-[15px] text-center mb-2">Fetch User Details first</p> : <p className="text-[15px] text-center mb-2">Click on UserName below to see All Details</p>}
                <h2 className="bg-green-600 w-full p-3 text-center rounded-lg text-white font-medium mb-6">
                    {data === "nothing" ? "No Data Available" : <Link
                        href={{
                            pathname: `/profile/${allData._id}`,
                            query: {
                                data: JSON.stringify(allData)
                            }
                        }}
                        className="hover:underline">{data}</Link>}
                </h2>
                <button
                    className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold mb-4 py-2 px-4 rounded transition duration-300"
                    onClick={getUserDetails}
                >
                    Get User Details
                </button>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  transition duration-300"
                    onClick={logout}
                >
                    Logout
                </button>
            
            </div>
        </div>
    )
}
