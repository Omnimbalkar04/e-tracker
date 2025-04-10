import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className=" bg-white">
    <div className="min-h-screen ">
      <Navbar />
      <main className="max-w-7xl  mx-auto px-1 py-2  rounded-2xl">
        {children}
      </main>
    </div>
    </div>
  )
}

export default Layout