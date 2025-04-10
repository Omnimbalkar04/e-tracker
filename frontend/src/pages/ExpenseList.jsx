import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Transactions from '../component/Transactions'
import { axiosInstance } from '../lib/axios'
import { ArrowLeft, PlusIcon } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend  } from "recharts";
import { useNavigate } from 'react-router-dom'

const COLORS = ["#00e558", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpenseList = () => {

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: budgets } = useQuery({ 
     queryKey: ["budgets"],
     queryFn: async () => {
       const res = await axiosInstance.get("/budgets");
       return res.data;
     }
    })

    const navigate = useNavigate();

    let setBudgetValue = "Loading..";
  let totalExpense = "Loading..";
  let availableBalance = "Loading..."; // Default value
 // Check if budgets exist and has at least one entry before accessing properties
 if (Array.isArray(budgets) && budgets.length > 0) {
 setBudgetValue = budgets[0]?.setbudget ?? "No Budget Found";

  const enteramounts = budgets[0]?.expenses?.map((expense) => expense.enteramount) || [];

 totalExpense = enteramounts.reduce((total, amount) => total + amount, 0);

  availableBalance = setBudgetValue - totalExpense;
  
} else {
  console.log("Budgets data not available yet.");
}


const data = [
  {name: "Spent", value: totalExpense},
  {name: "Remaining",
    value: setBudgetValue - totalExpense,
  },
];

const renderCustomLabel = ({ cx, cy }) => {
  return(
    
    <text
    x={cx}
    y={cy}
    fill="#00e558"
    textAnchor="middle"
    dominantBaseline="central"
    >
      <tspan
       x={cx}
       dy="0em"
       fontSize="28px"
       fontWeight="bold"
      >
        {`₹${totalExpense}`}
      </tspan>
      <tspan  x={cx} dy="1.5em" fontSize="14px" fill="#888">
        {`Spent 🔥`}
      </tspan>
    </text>
  )
}

const back = () => {
  navigate("/")
}

const add = () => {
  navigate("/add-expense");
}
 
  return (
    <div>
      <div className="grid grid-cols-3 text-black p-2 border border-gray-500/40 rounded-2xl shadow">
        <div onClick={back} className="col-span-1 ">
        <ArrowLeft className='p-1 cursor-pointer rounded-xl bg-green-600 text-white ' size={30} />
        </div>
        
        <h2 className="text-center text-lg lg:text-2xl font-bold col-span-1">Your <span className="text-green-400">E</span>xpenses</h2>

        <div className="flex justify-end col-span-1">
        <PlusIcon onClick={add} className='p-1 cursor-pointer rounded-xl bg-green-600 text-white' size={30} />
        </div>
        
      </div>



      <div className="lg:col-span-1 p-2 m-4 bg-sky-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex justify-center  rounded-2xl">
                  <PieChart width={200} height={250} >
                    <Pie
                    data={data}
                    cy="50%"
                    cx="50%"
                    // labelLine={false}
                    // outerRadius={80}
                    // fill="#8884d8"
                    // dataKey="value"
                    //   cx={120}
                    // cy={200}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#00C49F"
                    paddingAngle={5}
                    dataKey="value"
                    label={renderCustomLabel} 
                    >
                       {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                    layout="horizontal" // Set the layout as "horizontal"
                    verticalAlign="bottom" // Align the legend at the bottom
                    align="center" // Center the legend
                     />
                  </PieChart>
                </div>


      <div className="m-2 border-2 rounded-2xl shadow-xl">
      {budgets?.map(budget => <Transactions key={budget._id} budget={budget} /> )}
      </div>

    </div>
  )
}

export default ExpenseList