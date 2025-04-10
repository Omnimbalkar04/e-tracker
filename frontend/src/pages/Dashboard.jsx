import { useQuery } from "@tanstack/react-query";
import React from "react";
import Sidebar from "../component/Sidebar";
import { Plus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Budget from "../component/Budget";
import Transactions from "../component/Transactions";
import { PieChart, Pie, Cell, Tooltip, Legend  } from "recharts";

const COLORS = ["#00e558", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => {
      const res = await axiosInstance.get("/budgets");
      return res.data;
    },
  });

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-200 rounded-xl ">
      <div className="rounded-2xl hidden  lg:block lg:col-span-1 p-2 m-2 bg-white ">
        <Sidebar user={authUser} />
      </div>
      <div className="lg:hidden bg-white m-2 text-black rounded-2xl border border-green-400 ">
        <h2 className="m-2">🤟 Welcome <span className="text-green-400 font-bold">{authUser.username}..!</span></h2>
        
      </div>

      {/* Second Block */}
      <div className=" lg:block lg:col-span-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Anyalsis Block */}
          <div className="lg:col-span-1 p-2 m-2 bg-sky-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex justify-center  rounded-2xl">
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

          {/* Bal, Income and Budget Block */}
          <div className="lg:col-span-1 ">
            <div className="grid grid-cols-2">
              {/* Bal Block */}
              <div className="col-span-1 p-2 m-2 text-black bg-gradient-to-br from-indigo-400/65 to-violet-50 font-semibold rounded-xl  shadow-sm transition-all duration-300 hover:shadow-lg ">
                <h2 className="text-xl">Available Balance: </h2>
                <div className="flex justify-between text-green-600 ">
                  <Wallet size={26} />
                <h2 className="text-xl">₹{availableBalance}</h2>
                </div>
                
                </div>

              {/* Create Budget */}
              <div className="col-span-1 p-2 m-2 border-2 border-gray-400/55  rounded-2xl">
                <div className="flex justify-between">
                  <h1 className="text-gray-900 font-semibold  text-xl">
                    Create Budget
                  </h1>

                  <Link to={"/create-budget"}>
                    <div className=" m-2 p-2 rounded-full border border-gray-600/40 bg-white text-black ">
                      <Plus size={30} />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Budget */} 
              <div className="col-span-2  p-2 m-2  rounded-2xl  bg-green-600 glass h-full bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-0 ">
                <div className=" ">
                  <h1 className="text-white font-semibold m-2  text-2xl">
                    Your Budget (Monthly){" "} 
                  </h1>

                  <h2 className="text-black font-semibold  text-xl">
                    {budgets?.map((budget) => (
                      <Budget key={budget._id} budget={budget} />
                    ))}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Block */}
          <div className="lg:col-span-2 m-2 bg-white rounded-2xl">
            {budgets?.map((budget) => (
              <Transactions key={budget._id} budget={budget} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl "></div>
    </div>
  );
};

export default Dashboard;
