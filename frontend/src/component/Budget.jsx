import { Wallet } from 'lucide-react'
import React from 'react'
import ShinyText from '../../ReactBits/ShinyText/ShinyText'


const Budget = ({budget}) => {
  return (

    <div className='flex justify-between mt-3'>

      <h1 className="m-2 p-3  bg-gray-50 border/0 rounded-full ">
      <Wallet size={35} className='' />
      </h1>
      
      <h2 className="text-white p-2 m-2 text-3xl">
      ₹{budget.setbudget}
      </h2>
      <ShinyText  disabled={false} speed={3} className='custom-class' />
    </div>
  )
}

export default Budget