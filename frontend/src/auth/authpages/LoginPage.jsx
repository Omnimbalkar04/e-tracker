import React from 'react'
import LoginForm from '../LoginForm'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa6'

const LoginPage = () => {
  return (
    <div className="min-h-screen  rounded-2xl bg-gray-100 mt-5  py-4 sm:px-6 lg:px-8 ">

      <div className="m-2 lg:grid lg:grid-cols-2 rounded-2xl bg-white">
        <div className="">

      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-20">
        <h1 className="text-center text-3xl font-bold text-green-400  ">Login</h1>
        <h2 className="text-center text-2xl  text-gray-500">Sign in to your account</h2>
      </div>

      <div className="mt-8  sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="mt-5 lg:py-8 lg:px-4  sm:rounded-lg sm:px-10">
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500'>New to <span style={{ color: "#00e558" }}>E</span>-Track?</span>
            </div>
            <div className='mt-6'>
            <Link
              to='/signup'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-gray-100 '
            >
              Join now
            </Link>
            </div>
            </div>
          </div>

          
        </div>
      </div>
      </div>

      <div className=" m-2 hidden lg:block ">
        <img src="/LoginPageImg.jpeg" alt="login page img" className="rounded-2xl" />
      </div>
      
      </div>

      
    </div>
  )
}

export default LoginPage