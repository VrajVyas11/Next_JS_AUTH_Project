"use client"

import Link from "next/link"

export default function Home() {

  return (
    <div className="bg-gray-700 pt-10 px-10">
      <section className="py-10 md:py-16 md:pb-2 sm:py-4 bg-black rounded-[40px]">
        <div className="container max-w-screen-xl mx-auto px-4">
          <nav className="flex items-center justify-between mb-10">
            <img className="bg-white h-15 rounded-full p-1 bg-opacity-70" src="/navbar-logo.png" alt="Logo" />
            <div className="">
              <Link href="/signup">
                <button
                  className="px-7 py-3 md:px-9 md:py-4 border-white border font-medium md:font-semibold text-white text-md rounded-md hover:bg-white hover:text-black transition ease-linear duration-500">
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button
                  className="px-7 ml-6 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">
                  Login
                </button>
              </Link>
            </div>
          </nav>
          <h1 className="w-full text-center font-serif text-[40px] tracking-widest mb-0">Next.JS </h1>
          <h1 className="w-full text-center font-serif text-[40px] tracking-widest mb-10">Authentication Demo</h1>
          <div className="text-center px-10">
            <div className="flex flex-row items-center w-full justify-between p-4 px-6 bg-white bg-opacity-20 rounded-full">
              <div className="flex justify-center w-fit h-fit p-3 bg-white rounded-full">
                <img className="h-28 w-28 md:h-28 md:w-28 sm:h-14 sm:w-14 size-fit" src="/next.svg" alt="Image" />
              </div>
              <div className="flex justify-center w-fit h-fit p-3 bg-white bg-opacity-20 rounded-full">
                <img className="h-28 w-28 md:h-28 md:w-28 sm:h-14 sm:w-14 size-fit" src="/mailtrap.svg" alt="Image" />
              </div>
              <div className="flex justify-center w-fit h-fit p-5 bg-white rounded-full">
                <img className="h-24 w-24 md:h-24 md:w-24 sm:h-10 sm:w-10 size-fit" src="/mongodb.png" alt="Image" />
              </div>
              <div className="flex justify-center w-fit h-fit p-7 bg-white bg-opacity-20 rounded-full">
                <img className="h-20 w-20 md:h-20 md:w-20 sm:h-6 sm:w-6 size-fit" src="/tailwind.png" alt="Image" />
              </div>
              <div className="flex justify-center w-fit h-fit p-7 bg-white rounded-full">
                <img className="h-20 w-20 md:h-20 md:w-20 sm:h-6 sm:w-6 size-fit" src="/nodejs.png" alt="Image" />
              </div>
            </div>
            <div className="px-8 py-10 rounded-md">
              <h1 className="font-medium  text-justify text-gray-500 text-lg md:text-lg uppercase mb-8 flex">
                Welcome to Our Secure Authentication System
                Our app, built with Next.js, Nodemailer, Tailwind CSS, MongoDB, and Mailtrap, ensures secure and efficient user authentication.
              </h1>
              <div className="flex flex-row justify-center gap-3">
                <div className="p-1 h-fit w-10 bg-emerald-500 rounded-full">
                  <img className="size-fit bg-white rounded-full" src="/icon.png" />
                </div>
                <h1 className="font-medium text-center  text-white text-2xl md:text-3xl uppercase">Key features:</h1>
              </div>
              <section className="py-10 md:py-10">
                <div className="container max-w-screen-xl mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> User Authentication:
                        <p className="font-medium  text-gray-500 text-md">Handles login, signup, and logout securely.<br /></p>
                      </h4>
                    </div>
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> Email Verification:
                        <p className="font-medium  text-gray-500 text-md">Sends verification emails via Mailtrap.<br /></p>
                      </h4>
                    </div>
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> Password Reset:
                        <p className="font-medium  text-gray-500 text-md">Allows password recovery through email.<br /></p>
                      </h4>
                    </div>
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> Token Management:
                        <p className="font-medium  text-gray-500 text-md">Uses tokens for secure session management.<br /></p>
                      </h4>
                    </div>
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> Secure Routes:
                        <p className="font-medium  text-gray-500 text-md">Protects all routes, accessible only to logged-in users.<br /></p>
                      </h4>
                    </div>
                    <div className="bg-gray-50 px-8 pt-4 rounded-md h-fit">
                      <h4 className="font-bold  text-gray-700 text-lg mb-4"> Good Design:
                        <p className="font-medium  text-gray-500 text-md">Offers a user-friendly interface with Tailwind CSS.<br /></p>
                      </h4>
                    </div>
                  </div>
                </div>
              </section>
              <p className="font-normal  text-center text-gray-500 text-md md:text-xl">
                Our app provides a reliable and secure solution for managing user authentication and protecting sensitive data.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end items-end px-4 opacity-45">~ Vraj Vyas</div> */}
      </section>
    </div>
  );
}
