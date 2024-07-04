"use client"

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UserProfile({ params }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const userData = data ? JSON.parse(data) : null;

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  if (!userData) {
    return (
      <div
        style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white"
      >
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-gray-800 bg-opacity-90 rounded-3xl">
          <h1 className="text-4xl mb-4">No User Data</h1>
        </div>
      </div>
    );
  }

  if (!userData.isVerified) {
    return (
      <div
        style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white"
      >
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-gray-800 bg-opacity-90 rounded-3xl">
          <h1 className="text-4xl mb-4">Please verify your email first</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
      className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white"
    >

      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-gray-800 bg-opacity-90 rounded-3xl mt-6">
        <div className="flex w-full items-center justify-center mb-5 px-6">

          <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full">
            <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
          </div>

        </div>
        <h1 className="text-4xl mb-4">User Details</h1>
        <div className="mt-4 p-4 pt-7 px-14 w-full bg-gray-700 bg-opacity-75 rounded-lg text-left">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <span className="text-xl border-r-2 border-r-black font-bold">Unique ID:</span>
            <span className="text-xl bg-orange-500 text-black px-1 rounded">{userData._id}</span>
            <span className="text-xl border-r-2 border-r-black font-bold">Username:</span>
            <span className="text-xl">{userData.username}</span>
            <span className="text-xl border-r-2 border-r-black font-bold">Email:</span>
            <span className="text-xl">{userData.email}</span>
            <span className="text-xl border-r-2 border-r-black font-bold">Verified:</span>
            <span className="text-xl">{userData.isVerified ? 'Yes' : 'No'}</span>
            <span className="text-xl border-r-2 border-r-black font-bold">Role:</span>
            <span className="text-xl">{userData.isAdmin ? 'Admin' : 'User'}</span>
          </div>
          <div className="flex w-full  pt-3  items-center justify-between mb-5 px-20 mt-5">
            <Link href="/profile">
              <button
                className="bg-gray-500 text-center hover:bg-gray-700 text-white font-bold py-4 px-4 rounded transition duration-300"
              >
                Back to Profile
              </button>
            </Link>
            <button
              className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-4 px-10 rounded transition duration-300"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
