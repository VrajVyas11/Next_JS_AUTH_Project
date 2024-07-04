"use client";

import * as yup from 'yup';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function VerifyPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [token, setToken] = useState<string>("");
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    if (verified && !passwordChanged) {
      toast.success("Token is Verified");
    }
  }, [verified])

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("URL Token:", urlToken);
    if (urlToken) {
      setToken(urlToken);
      verifyPasswordToken(urlToken);
    } else {
      setLoading(false);
    }
  }, []);

  const schema = yup.object().shape({
    password: yup.string().required('Please enter a password').min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
  });


  const verifyPasswordToken = async (token: string) => {
    try {
      const response = await axios.post("/api/users/verifypassword", { token });
      console.log("Verify Token Response:", response.data);
      setVerified(true);
    } catch (error: any) {
      if (error.response?.data?.error === "Invalid Token") {
        setError(true);
        toast.error("Invalid or Expired Token");
      } else {
        setError(true);
        toast.error("Failed to verify token");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (values: { password: string }) => {
    try {
      await axios.post("/api/users/forgotpassword", { token, password: values.password });
      setPasswordChanged(true);
      toast.success("Password reset successfully!");
    } catch (error: any) {
      if (error.response?.data?.error === "New Password Can't be the same as Old Password") {
        toast.error("New Password Can't be the same as Old Password");
      } else if (error.response?.data?.error === "Invalid Token") {
        toast.error("Invalid Token");
      } else {
        setError(true);
        toast.error("Failed to reset password");
      }
    }
  };

  const toggleShowToken = () => {
    setShowToken((prev) => !prev);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className="text-3xl text-red-500">Error: Invalid or Expired Token</h2>
        <p className="text-lg text-gray-700 mt-4 mb-8">If you did not receive an email, please check your spam folder or request a new verification link.</p>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Go to Login
        </Link>
      </div>
    );
  }


  if (verified && !passwordChanged) {



    return (
      <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white">
        <div className="flex flex-col items-center justify-center w-fit p-6 px-16 bg-gray-800 bg-opacity-90 rounded-3xl">
          <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full mb-4">
            <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
          </div>
          <h1 className="text-4xl mb-4">Reset Password</h1>
          <div className='flex flex-row justify-center items-center'>
            <span className="text-xl bg-black text-orange-500 px-1 rounded rounded-r-none">Token:</span>
            <button onClick={toggleShowToken} className="text-[12px] py-1 font-bold bg-orange-500 text-black px-1 rounded rounded-l-none">{showToken ? token : "Show"}</button>
          </div>
          <p className="text-lg text-gray-400 mt-4 mb-2">A link has been sent to your email. Please click the link to verify.</p>

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={schema}
            onSubmit={resetPassword}
          >
            {({ isValid, dirty }) => (
              <Form className="flex flex-col bg-gray-700 rounded-3xl bg-opacity-35 p-4 px-10 justify-center items-center w-fit">
                <div className="flex flex-row items-center w-96 justify-start  py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg">
                  <img className="text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/password.png" alt="password icon" />
                  <Field id="password" name="password" type="password" className="rounded-lg p-2 text-black w-full bg-white bg-opacity-20" placeholder="New Password" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-4" />
                <br />
                <div className="flex flex-row items-center w-96 justify-start  py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg">
                  <img className="text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/password.png" alt="password icon" />
                  <Field id="confirmPassword" name="confirmPassword" type="password" className="rounded-lg p-2 text-black w-full bg-white bg-opacity-20" placeholder="Confirm New Password" />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mb-4" />

                <button
                  type="submit"
                  className={`px-7 mt-6 w-fit py-3 md:px-20 md:py-4 bg-black font-medium md:font-semibold text-white text-md rounded-md hover:bg-white hover:text-black transition ease-linear duration-500 ${!(isValid && dirty) || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!(isValid && dirty) || loading}
                >
                  {loading ? "Processing..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>

          <Link href="/login" className="text-blue-500 hover:text-blue-700 underline font-bold py-2 px-4 rounded transition duration-300">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (passwordChanged) {
    return (
      <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white">
        <div className="flex flex-col items-center justify-center w-full md:w-2/3 lg:w-2/5 p-6 bg-gray-800 bg-opacity-90 rounded-3xl">
          <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full mb-4">
            <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
          </div>
          <h1 className="text-4xl mb-4">Reset Password</h1>
          <h2 className="text-2xl mb-8 text-emerald-500">Password reset successfully!</h2>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='justify-center items-center flex m-48 '>
      <div className="flex flex-col items-center justify-center w-fit p-6 px-16 bg-gray-800 bg-opacity-90 rounded-3xl">
        <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full mb-4">
          <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
        </div>
        <h1 className="text-4xl mb-4">Reset Password</h1>

        <p className="text-lg text-gray-700 mt-4 mb-8 bg-yellow-400 rounded-lg px-3">A link has been sent to your email. Please click the link to verify.</p>
      </div>
    </div>
  )
}
