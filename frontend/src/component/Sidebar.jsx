import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Home, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { GiExpense } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { axiosInstance } from "../lib/axios";


const Sidebar = ({ user }) => {

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    }
  })
  return (
    <div className=" top-0 z-10 text-black rounded-2xl m-2  lg:min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-1 ">
        {/* <div className="flex justify-center m-2 text-3xl font-bold items-center py-3  ">
          <Link to="/" >
          <span style={{ color: "#00e558" }}>E</span>-Track
          </Link>
        </div> */}

     <div className=" bg-white  text-black rounded-2xl border border-green-400 ">
        <h2 className="m-2 text-xl">🤟 Welcome <span className="text-green-400 text-xl font-bold">{user.username}..!</span></h2>
        
      </div>
        <div className=" items-center m-2 p-2 md:gap-6 lg:col-span-1 ">
           { user ? (
            <div className="">
            <>
            <div className="m-2 pb-3">
              <Link to={`/profile/${user.username}`} >
              <img src={user.profilePicture || "avatar.png"} alt={user.name} className="w-25 h-25 rounded-full mx-auto object-cover" />
              </Link>

              <h2 className="text-center text-2xl font-bold">{user.name}</h2>
              <h2 className="text-center text-lg text-gray-600 font-bold">{user.email}</h2>
            </div>

            <hr className="text-gray-500 w-full" />

            <h2 className="text-xl text-center font-bold mt-2 text-green-500">MENU</h2>

            <Link  to={"/"} className='grid grid-cols-4 items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-2 rounded-lg' >
            
            <Home size={20}  />
            
            <span className='text-xl text-center font-bold hidden md:block col-span-2'>Dashboard</span>
            </Link>

            <Link  to={"/expense-list"} className=' grid grid-cols-4 items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-2 rounded-lg' >
            <GiExpense size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2'>Expense</span>
            </Link>

            <Link  to={"/add-expense"} className=' grid grid-cols-4 items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-2 rounded-lg' >
            <FaWallet size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2 '>Add</span>
            </Link>

            <Link  to={`/profile/${user.username}`} className='grid grid-cols-4 items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-2 rounded-lg' >
            <User size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2 '>Me</span>
            </Link>

            <hr className="text-gray-500 w-full" />            
            </>

            <div className="flex justify-center items-center mt-4 p-2 border border-gray-500/45 rounded-3xl cursor-pointer hover:text-amber-100  hover:bg-gradient-to-bl hover:from-blue-400 hover:to-green-500 hover:transition hover:duration-150 hover:ease-in-out">
            <button className=" space-x-1 text-sm  rounded-2xl  " 
            onClick={() => logout()}
            >
              <LogOut size={20} />
            </button>
            <h2 className="text-lg font-bold">Logout</h2>
            </div>

            </div>
           ) : (
            <>
              <Link to='/signup' className='btn btn-ghost text-lg  text-orange-100 hover:bg-gradient-to-b hover:from-blue-400 hover:to-green-500 hover:transition hover:duration-150 hover:ease-in-out rounded-2xl'>
                Sign In
              </Link>
              <Link to='/login' className='btn text-lg  text-orange-100 bg-gradient-to-b from-blue-400 to-green-500 transition duration-150 ease-in-out rounded-2xl'>
                login
              </Link>
            </>
           ) }
        </div>
      </div>

    </div>
  )
}

export default Sidebar