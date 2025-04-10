import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const CreateBudget = () => {
  const [setincome, setIncome] = useState("");
  const [setbudget, setBudget] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: createBudgetMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/budgets/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("budget created successfully");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to create budget");
    },
  });

  const resetForm = () => {
    setIncome("");
    setBudget("");
  };

  const handleBudgetCreation = () => {
    try {
      const postData = {
        setincome,
        setbudget,
      };

      createBudgetMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-green-300/55 rounded-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-2xl bg-white shadow-md">
        <h1 className="text-center text-4xl m-2 font-bold  text-black  ">
          Set Budget
        </h1>

        <div className="grid grid-cols-1  gap-1 m-3 p-1">
          <h1 className=" text-lg m-2 font-bold  text-black  ">Set Income</h1>
          <input
            type="number"
            placeholder="Enter your Income"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={setincome}
            onChange={(e) => setIncome(e.target.value)}
          />

          <h1 className=" text-lg m-2 font-bold  text-black  ">Set Budget</h1>

          <input
            type="number"
            placeholder="Enter your Budget"
            className="w-full text-black p-1 font-bold text-xl rounded-lg  border-3 border-gray-700 focus:outline-none resize-none transition-colors duration-200 "
            value={setbudget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <div className="p-1 m-2 rounded-lg border-2 bg-gray-950  ">
            <h2 className="p-1 m-1 font-bold text-xl text-white">Your Monthly Budget:- {setbudget}</h2>
          <button
            className="bg-white text-gray-800 font-bold text-xl rounded-lg p-1 hover:bg-primary-dark transition-colors duration-200 w-full "
            onClick={handleBudgetCreation}
            disabled={isPending}
          >
            {isPending ? <Loader className="size-5 animate-spin " /> : "Submit"}
          </button>
          </div>

      </div>
    </div>
  );
};

export default CreateBudget;
