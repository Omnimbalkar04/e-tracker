import React from "react";
import SignupForm from "../SignupForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="min-h-screen rounded-2xl bg-gray-100 mt-5  py-2  sm:px-6 lg:px-4">

      <div className="m-2 lg:grid lg:grid-cols-2 rounded-2xl bg-white">

        <div className=" lg:mt-20">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-green-400 mt-2   ">Sign Up</h1>
        <h2 className="text-center text-2xl  text-gray-500">
          Manage your Expenses
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className=" lg:py-8 lg:px-4  sm:rounded-lg sm:px-10">
          <SignupForm />

          <div className="mt-6">
            <div className="relative">
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500'>Already on<span style={{ color: "#00e558" }}>E</span>-Track?</span>
            </div>
            <div className='mt-6'>
            <Link
              to='/login'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 '
            >
              Sign In
            </Link>
            </div>
            </div>
          </div>

        </div>
        </div>
        </div>

        <div className="m-2 hidden lg:block ">
        <img src="/SignUpImg2.jfif" alt="login page img" className="rounded-2xl w-full" />
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
