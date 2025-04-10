import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signUpMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey:["authUser"] })
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation({ name, username, email, password })
   
  }
  return (
    <div className=" m-2 p-2 ">
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">

    <h2 className="text-gray-700 font-bold">Enter Name</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800 "
        required
      />

    <h2 className="text-gray-700 font-bold">Enter Username</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800 "
        required
      />

    <h2 className="text-gray-700 font-bold">Enter Email</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800 "
        required
      />

    <h2 className="text-gray-700 font-bold">Enter Password</h2>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full bg-white border border-green-400/60 text-gray-800 "
        required
      />

      <button type='submit' disabled={isLoading} className="btn w-full bg-green-500 mt-3">
        {isLoading ? (
          <Loader className="size-4 animate-spin" />
        ) : ( 
          "Agree & Join"
         )} 
      </button>
    </form>
    </div>
  )
}

export default SignupForm