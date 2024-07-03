"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useEmail } from "@/context";

const EmailRequestPage = () => {
  const router = useRouter();
  const { setEmail } = useEmail();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("You must enter an email"),
  });

  const onRequestPasswordReset = async (values: { email: string }) => {
    try {
      setLoading(true);
      await axios.post("/api/users/validateemail", { email: values.email });
      setEmail(values.email);
      toast.success("Password reset link sent to your email");
      router.push("/verifypassword/token"); // This would be handled by your backend
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to request password reset");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2 text-white">
      <div className="flex flex-col items-center justify-center w-full md:w-2/6 p-6 bg-gray-800 bg-opacity-90 rounded-3xl">
        <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full mb-4">
          <img className="h-16 w-16 size-fit" src="/user.png" alt="User" />
        </div>
        <h1 className="text-4xl mb-4">Verify Email</h1>
        {/* <h1 className="text-4xl mb-4">Request Password Reset</h1> */}
        <Formik
        
          initialValues={{ email: '' }}
          validationSchema={schema}
          onSubmit={onRequestPasswordReset}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col items-center w-full">
              <div className="flex flex-row items-center w-72 justify-start py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg">
                <img className="text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/email.png" alt="email icon" />
                <Field id="email" name="email" type="email" className="rounded-lg p-2 text-black" placeholder="Email" />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-4" />
              <button
                type="submit"
                className={`px-7 mt-6 w-fit py-3 md:px-20 md:py-4 bg-black font-medium md:font-semibold text-white text-md rounded-md hover:bg-white hover:text-black transition ease-linear duration-500 ${!(isValid && dirty) || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={(!(isValid && dirty) || loading)}
              >
                {loading ? "Processing" : "Request Password Reset"}
                
              </button>
              <Link className="underline text-lg mt-3 text-blue-200 hover:text-blue-400" href="/login">Go to Login</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmailRequestPage;
