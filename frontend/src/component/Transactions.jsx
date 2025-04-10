import { NotebookText } from 'lucide-react';
import React from 'react'
import { BiCategory, BiTime, BiTransfer } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { LiaCoinsSolid } from "react-icons/lia";
import { formatDistanceToNow } from "date-fns";

const Transactions = ({budget}) => {
  
  return (
    <div className='text-black'>
     
  <div  className='m-4 '>
    
  <h2 className="text-2xl font-bold p-2 flex gap-1 items-center "> <BiTransfer className='text-green-600' /> Transactions</h2>

   <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700  rounded-xl bg-clip-border">
    
    <table className='w-full text-left table-auto min-w-max
    '>
   <thead>
    <tr >
      <th className="p-4 border-b-2 border-gray-200 bg-gray-100"><p className=" flex items-center gap-1 font-bold text-lg antialiased leading-none text-gray-900 opacity-70">
        <div className="p-2 rounded-xl bg-green-600 text-white">
        <BiCategory size={20}  />
        </div>
      
        Category 
         </p></th>

      <th className="p-4 border-b-2 border-gray-200 bg-gray-100"><p className="flex items-center gap-1 font-bold text-lg antialiased leading-none text-gray-900 opacity-70">
        <div className="p-2 rounded-xl bg-green-600 text-white">
        <RiMoneyRupeeCircleFill size={25} className='bg-green-600' />
        </div>
        Amount</p></th>

      <th className="p-4 border-b-2 border-gray-200 bg-gray-100"><p className="flex items-center gap-1 font-bold text-lg antialiased leading-none text-gray-900 opacity-70">
        <div className="p-2 rounded-xl bg-green-600 text-white">
          <NotebookText  />
        </div>
        Reason</p></th>
      <th className="p-4 border-b-2 border-gray-200 bg-gray-100"><p className="flex items-center gap-1 font-bold text-lg antialiased leading-none text-gray-900 opacity-70">
        <div className="p-2 rounded-xl bg-green-600 text-white">
          <LiaCoinsSolid size={25} />
        </div>
        Paid</p></th>

        <th className="p-4 border-b-2 border-gray-200 bg-gray-100"><p className="flex items-center gap-1 font-bold text-lg antialiased leading-none text-gray-900 opacity-70">
        <div className="p-2 rounded-xl bg-green-600 text-white">
          <BiTime size={25} />
        </div>
        Time</p></th>
    </tr>
    </thead>

    {budget.expenses && budget.expenses.map((expense) => (
     <tbody key={expense._id}>
      <tr>
        <td className="p-4 border-b border-gray-50 ">
          <p className="block font-sans text-md antialiased font-bold leading-normal text-gray-900">
            {expense.category}
          </p>
        </td>
        <td className="p-4 border-b border-gray-50">
          <p className="block font-sans text-md antialiased font-bold leading-normal text-gray-900">
          ₹ {expense.enteramount}
          </p>
        </td>
        <td className="p-4 border-b border-gray-50">
          <p className="block font-sans text-md antialiased font-bold leading-normal text-gray-900">
            {expense.reason}
          </p>
        </td>
        <td className="p-4 border-b border-gray-50">
          <p className="block font-sans text-md antialiased font-bold leading-normal text-gray-900">
        {expense.paid}
          </p>
        </td>

        <td className="p-4 border-b border-gray-50">
          <p className="block font-sans text-md antialiased font-bold leading-normal text-gray-900">
        {formatDistanceToNow(new Date(expense.createdAt))}
          </p>
        </td>
      </tr>
     </tbody>
))} 

    </table>
    </div>

  </div>
{/* // ))} */}
  </div>
  )
}

export default Transactions