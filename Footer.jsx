import React from 'react'

const Footer = () => {
  return (
    <div className=' text-white  bg-slate-800 flex flex-col justify-center items-center  w-full'>
        <div className="logo font-bold text-2xl ">
      <span className="text-green-700" >&lt;</span>

       <span>Pass</span> 
       <span className="text-green-700" >OP&gt;</span>
        
        </div>
        <div className='flex justify-center items-center'>
      Create with <img className='w-7 mx-2' src="/heart.svg" alt="Love logo" /> by Khan
      </div>
    </div>
  )
}

export default Footer 
