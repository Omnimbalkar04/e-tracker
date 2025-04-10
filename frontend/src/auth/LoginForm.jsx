import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const [ username , setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong")
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  }
  
  return (
    <div className=" m-2 p-2 ">
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md m-2 p-2">

      <h2 className="text-gray-700 font-bold">Enter Username</h2>
      <input type="text" placeholder="Username"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
       className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800"
       required/>

       <h2 className="text-gray-700 font-bold">Enter Password</h2>
       <input 
       type="password"
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)} 
       className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800"
       required />

      <button type="submit" disabled={isLoading} className="btn  w-full  bg-green-500 mt-3">
       {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
     </button>
    </form>

    </div>

  )
}

export default LoginForm