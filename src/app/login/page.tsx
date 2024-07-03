"use client";

import * as yup from 'yup';
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('You must enter an email'),
    password: yup.string().required('Please enter a password').min(8, 'Should be at least 8 chars'),
  });

  const onLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      if(response.data.isVerified){
        console.log("this is response in login", response);
        toast.success("Login Successful", { duration: 2000 });
        router.push("/profile");
      }
      else{
        console.log("this is response in else login", response);
        toast.error("Please verify your Email first", { duration: 2000 });
      }

    } catch (error: any) {
      console.log("failure at login",error.response.data.error);
      toast.error(error.response.data.error, { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2">
      <div className="flex w-fit h-fit flex-col md:flex-row items-center justify-between p-4 px-6 bg-white bg-opacity-60 rounded-3xl">
   
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={onLogin}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col bg-gray-700 rounded-3xl bg-opacity-35 my-2 pl-32 pr-28 py-11 justify-center items-center w-full md:w-1/2">
              <div className="flex flex-col mb-10 items-center w-full justify-start rounded-full">
                <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full">
                  <img className="h-16 w-16 size-fit" src="/next.svg" alt="Image" />
                </div>
              </div>

              <div className="flex flex-row items-center w-72 justify-start  py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg">
                <img className="text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/email.png" alt="email icon" />
                <Field id="email" name="email" type="text" className="rounded-lg p-2 text-black" placeholder="Email" />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              <br/>

              <div className="flex flex-row items-center w-72 justify-start  py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg">
                <img className="text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/password.png" alt="password icon" />
                <Field id="password" name="password" type="password" className="rounded-lg p-2 text-black" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              <br/>
              
              <Link className="underline text-base mt-3 text-blue-200 hover:text-blue-400" href="/verifypassword">Forgot Password?</Link>
              <button
                type="submit"
                className={`px-7 mt-3 w-full py-3 md:px-9 md:py-4 bg-black font-medium md:font-semibold text-white text-md rounded-md hover:bg-white hover:text-black transition ease-linear duration-500 ${!(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={(!(isValid && dirty) || loading)}
              >
                {loading ? "Processing" : "Login"}
              </button>
{/* <div className=' flex w-full flex-col justify-center itmes-center'> */}
              <Link className="underline text-base mt-3 text-blue-200 hover:text-blue-400" href="/signup">SignUp Page</Link>
              {/* </div> */}
            </Form>
          )}
        </Formik>
        <img src="/login.svg"
          className="w-full md:w-1/2 h-72 md:h-auto"
          style={{ background: `url("/login.svg")`, backgroundSize: "cover", backgroundPosition: "center" }}
          alt="login illustration"
        />
      </div>
    </div>
  );
}
