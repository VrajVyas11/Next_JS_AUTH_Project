"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white">
      <div className="flex flex-col items-center justify-center w-full md:w-2/6 p-6 bg-gray-800 bg-opacity-90 rounded-3xl">
        <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full mb-4">
          <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
        </div>
        <h1 className="text-4xl mb-4">Verify Email</h1>

        {token ? (
          <h2 className="p-2 bg-orange-500 text-[13px] text-black rounded-md mb-4">{`${token}`}</h2>
        ) : (
          <h2 className="p-2 bg-yellow-500 text-black rounded-md mb-4">A verification link has been sent to your email.</h2>
        )}

        {verified && (
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-2xl mb-4 text-emerald-500">Email verified successfully!</h2>
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center mt-4">
            <h2 className=" bg-red-500 p-2 text-xl  text-black rounded-md mb-4">Invalid / Expired Token</h2>
            <p className="text-[15px] text-center">If you did not receive an email, please check your spam folder or request a new verification link.</p>
            <div className="flex flex-col items-center mt-4">
            <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300">
              Go to Login Anyway
            </Link>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
