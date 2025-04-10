import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AddExpense from './AddExpense'

const AddExpensePage = () => {

  const {data: budgets} = useQuery({queryKey: ["budgets"]})
  return (
    <div className='flex justify-center items-center '>
      {budgets?.map(budget => <AddExpense key={budget._id} budget={budget} /> )}
    </div>
  )
}

export default AddExpensePage