import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, NotebookText } from 'lucide-react';


const AddExpense = ({budget}) => {
  const [ expenses, setExpense ] = useState(budget?.expenses || []);
  // const [ enteramount, setEnteramount ] = useState(budget?.enteramount || []);
  // const [ reason, setReason ] = useState(budget?.reason || []);
  // const [ paid, setPaid ] = useState(budget?.paid || []);
  // const [ category, setCategory ] = useState(budget?.category || []);

  const [ newAmount, setNewAmount ] = useState("");
  const [ newReason, setNewReason ] = useState("");
  const [ newPaid, setNewPaid ] = useState("");
  const [ newCategory, setNewCategory ] = useState("");
  
   const { data: authUser } = useQuery({ queryKey: ["authUser"] });


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  

  const { mutate: addExpense, isPending: isAddingExpense } = useMutation({
    mutationFn: async({newAmount, newReason, newPaid, newCategory}) => {
      // console.log("📡 Sending API Request with Data:", {
      //   enteramount: newAmount,
      //   reason: newReason,
      //   paid: newPaid,
      //   category: newCategory,
      // });
    
      await axiosInstance.post(`/budgets/${budget._id}/expense`,{
        enteramount: newAmount,
          reason: newReason,
          paid: newPaid,
          category: newCategory,
      } )
    },
    onSuccess: () => {
      // resetForm();
      queryClient.invalidateQueries({ queryKey: ["budgets"] })
      toast.success("Expense added successfully")
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to add Expense");
    }
  });

  // const resetForm = () => {
  //   setEnteramount([]);
  //   setPaid("");
  //   setReason("");
  //   setCategory("");
  // } 

  const handleAddExpense = async(e) => {
    e.preventDefault();
    // console.log("🚀 Sending Expense Data:", {
    //   newAmount,
    //   newReason,
    //   newPaid,
    //   newCategory
    // });

    try {
      
      addExpense({newAmount, newReason, newPaid, newCategory});
      setNewAmount("");
      setNewReason("")
      setNewPaid("")
      setNewCategory("");
      setExpense([
        ...expenses,
        {
          enteramount: newAmount,
          reason: newReason,
          paid: newPaid,
          category: newCategory,
          user:{
            _id:authUser._id,
            name:authUser.name,
            profilePicture: authUser.profilePicture
          },
          createdAt: new Date(),
        }
      ])

    } catch (error) {
      console.error("Error in handlePostCreation", error);
    }

  }

  const back = () => {
    navigate("/")
  }
  
  const add = () => {
    navigate("/expense-list");
  }
   


  return (
    <div className="min-h-screen w-full p-2 bg-gray-100 rounded-2xl">

     <div className="grid grid-cols-3 text-black p-2 border border-gray-500/40 bg-white rounded-2xl shadow">
              <div onClick={back} className="col-span-1 ">
              <ArrowLeft className='p-1 cursor-pointer rounded-xl bg-green-600 text-white ' size={30} />
              </div>
              
              <h2 className="text-center text-lg lg:text-2xl font-bold col-span-1">Your <span className="text-green-400">E</span>xpenses</h2>
      
              <div className="flex justify-end col-span-1">
              <NotebookText onClick={add} className='p-1 cursor-pointer rounded-xl bg-green-600 text-white' size={30} />
              </div>
              
            </div>

      <div className=" flex flex-col m-2 px-5 py-12 sm:px-6 lg:px-8 bg-green-300/55 rounded-2xl">
      
      
    <form onSubmit={handleAddExpense} className=" ">
      
      <div className="sm:mx-auto sm:w-full p-2  sm:max-w-md rounded-2xl bg-white shadow-md ">

      <h1 className="text-center text-4xl m-2 font-bold  text-black  ">
          Add Expense
        </h1>

        <div className="grid grid-cols-1  gap-1 m-3 p-1">
        <h1 className=" text-lg m-2 font-bold  text-black  ">Enter Amount</h1>
        <input
            type="number"
            placeholder="Enter your Amount"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />

<h1 className=" text-lg m-2 font-bold  text-black  ">Enter Reason</h1>
        <input
            type="text"
            placeholder="Enter Reason"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
          />

<h1 className=" text-lg m-2 font-bold  text-black  ">Enter Paid To</h1>
        <input
            type="text"
            placeholder="Enter Paid To"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={newPaid}
            onChange={(e) => setNewPaid(e.target.value)}
          />

<h1 className=" text-lg m-2 font-bold  text-black  ">Enter Category</h1>
        <input
            type="text"
            placeholder="Enter Category"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>

        
        <div className="p-1 m-2 rounded-lg border-2 bg-gray-950  ">
            <h2 className="p-1 m-1 font-bold text-xl text-white">Your Monthly Budget:- {newAmount}</h2>
          <button
            className="bg-white text-gray-800 font-bold text-xl rounded-lg p-1 hover:bg-primary-dark transition-colors duration-200 w-full "
            disabled={isAddingExpense}
          >
            {isAddingExpense ? <Loader className="size-5 animate-spin " /> : "Submit"}
          </button>
          </div>
        
      </div>
      
    </form>
    </div>
    </div>
  )
}

export default AddExpense