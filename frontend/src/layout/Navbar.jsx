import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Home, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { GiExpense } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { axiosInstance } from "../lib/axios";


const Navbar = () => {

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    }
  })

  const location = useLocation();

  const isSignup = location.pathname === '/signup';
  const isLogin = location.pathname === '/login';

  return (
    <nav className="sticky shadow top-0 z-10 text-black rounded-2xl  bg-white ">
      <div className="max-w-7xl mx-auto px-2 lg:px-3  ">
        <div className="flex justify-between m-2 items-center py-1  ">
          <div className="flex items-center space-x-4 font-bold text-3xl ">
          <Link to="/" className="text-sm lg:text-3xl" >
          <span style={{ color: "#00e558" }} className="text-sm lg:text-3xl">E</span>-Track
          </Link>
          </div>
        
        <div className=" flex items-center gap-1 md:gap-6">
           { authUser ? (
            <>
            {/* <div className="m-2 pb-3">
              <Link to={`/profile/${authUser.username}`}  >
              <img src={authUser.profilePicture || "avatar.png"} alt={authUser.name} className="w-20 h-20 rounded-full mx-auto" />
              </Link>

              <h2 className="text-center text-2xl font-bold">{authUser.name}</h2>
              <h2 className="text-center text-lg text-gray-600 font-bold">{authUser.email}</h2>
            </div> */}

            {/* <hr className="text-gray-500 w-full" /> */}
{/* 
            <h2 className="text-xl text-center font-bold mt-2 text-green-500">MENU</h2> */}

            <Link  to={"/"} className='flex flex-col items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-1 rounded-lg' >
            
            <Home size={20}  />
            
            <span className='text-xl text-center font-bold hidden md:block col-span-2'>Dashboard</span>
            </Link>

            <Link  to={"/expense-list"} className=' flex flex-col items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-1 rounded-lg' >
            <GiExpense size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2'>Expense</span>
            </Link>

            <Link  to={"/add-expense"} className=' flex flex-col items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-1 rounded-lg' >
            <FaWallet size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2 '>Add</span>
            </Link>

            <Link  to={`/profile/${authUser.username}`} className='flex flex-col items-center mt-3 m-2 hover:bg-green-600 hover:text-white hover:border-green-600 hover:transition hover:duration-150 hover:ease-in-out cursor-pointer hover:border p-1 rounded-lg' >
            <User size={20} />
            <span className='text-xl text-center font-bold hidden md:block col-span-2 '>Me</span>
            </Link>

            <div className="flex justify-center items-center mt-3 p-2 border border-gray-500/45 rounded-3xl cursor-pointer hover:text-amber-100  hover:bg-gradient-to-bl hover:from-blue-400 hover:to-green-500 hover:transition hover:duration-150 hover:ease-in-out" onClick={() => logout()}>
            <button className=" space-x-1 text-sm  rounded-2xl  " 
            
            >
              <LogOut size={20} />
            </button>
            <h2 className="lg:text-lg text-sm font-bold"onClick={() => logout()}>Logout</h2>
            </div>

            {/* <hr className="text-gray-500 w-full" />             */}
            </>
           
           ) : (
            <>

<div className="flex gap-4">
      <Link
        to="/signup"
        className={`btn text-lg text-orange-100 rounded-2xl transition duration-150 ease-in-out ${
          isSignup
            ? 'bg-gradient-to-b from-blue-400 to-green-500'
            : 'hover:bg-gradient-to-b hover:from-blue-400 hover:to-green-500'
        }`}
      >
        Sign In
      </Link>

      <Link
        to="/login"
        className={`btn text-lg text-orange-100 rounded-2xl transition duration-150 ease-in-out ${
          isLogin
            ? 'bg-gradient-to-b from-blue-400 to-green-500'
            : 'hover:bg-gradient-to-b hover:from-blue-400 hover:to-green-500'
        }`}
      >
        Login
      </Link>
    </div>
    
              {/* <Link to='/signup' className='btn text-lg  text-orange-100 hover:bg-gradient-to-b hover:from-blue-400 hover:to-green-500 hover:transition hover:duration-150 hover:ease-in-out rounded-2xl'>
                Sign In
              </Link>
              <Link to='/login' className='btn text-lg  text-orange-100 bg-gradient-to-b from-blue-400 to-green-500 transition duration-150 ease-in-out rounded-2xl'>
                login
              </Link> */}
            </>
           ) }
        </div>
        </div>
      </div>
    </nav>
    
  )
}

export default Navbar