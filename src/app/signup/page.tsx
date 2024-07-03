"use client";
import * as yup from 'yup';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required('please enter a username'),
    email: yup.string().email('Please enter a valid email').required('You must enter an email'),
    password: yup.string().required('Please enter a password').min(8, 'Letters should be more 8'),
  });

  const onSignUp = async (values:any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", values);
      console.log("this is response in sign up", response);
      router.push("/verifyemail");
    } catch (error:any) {
      console.log("failure at signup");
      toast.error(error.message );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: `url("/bgimg.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }} className="flex w-full h-full flex-col items-center justify-center min-h-screen py-2">
      <div className="flex w-fit h-fit flex-col md:flex-row items-center justify-between p-4 px-6 bg-white bg-opacity-60 rounded-3xl">
      <img src="/signup.svg" className="w-full md:w-1/2 h-72 md:h-auto" style={{ background: `url("/login.svg")`, backgroundSize: "cover", backgroundPosition: "center" }} alt="login illustration" />
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={schema}
          onSubmit={onSignUp}
        >
          {({ isValid, dirty }) => (
            <Form className="flex flex-col bg-gray-700 rounded-3xl bg-opacity-35 my-2 pl-32 pr-28 py-11 justify-center items-center w-full md:w-1/2">
              <div className="flex flex-col mb-10 items-center w-full justify-start rounded-full">
                <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full">
                  <img className="h-16 w-16 size-fit" src="/next.svg" alt="Image" />
                </div>
              </div>


              <div className="flex flex-row items-center w-72 justify-start py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg ">
                <img className=" text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/user.png" alt="username icon" />
                <Field id="username" name="username" type="text" className="rounded-lg p-2 text-black" placeholder="Username" /> 
              </div>
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              <br/>


              <div className="flex flex-row items-center w-72 justify-start  py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg ">
                <img className=" text-center h-7 w-7  font-serif text-black mr-3 ml-1" src="/email.png" alt="email icon" />
                <Field id="email" name="email" type="text" className="rounded-lg p-2 text-black" placeholder="Email" />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              <br/>


              <div className="flex flex-row items-center w-72 justify-start py-1 pl-2 pr-1 bg-white bg-opacity-20 rounded-lg ">
                <img className=" text-center h-7 w-7 font-serif text-black mr-3 ml-1" src="/password.png" alt="password icon" />
                <Field id="password" name="password" type="password" className="rounded-lg p-2 text-black" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              <br/>


              <button
                type="submit"
                className={`px-7 w-full mt-9 py-3 md:px-9 md:py-4 bg-black font-medium md:font-semibold text-white text-md rounded-md hover:bg-white hover:text-black transition ease-linear duration-500 ${!(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!(isValid && dirty)}
              >
                {loading ? "Processing" : "Sign Up"}
              </button>
              <Link className="underline text-lg mt-3 text-blue-200" href="/login">Visit Login page</Link>
            </Form>
          )}
        </Formik>
       
      </div>
    </div>
  );
}
