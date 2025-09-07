"use client";
import React from 'react'
import { MdMapsHomeWork } from "react-icons/md";

const Logo = () => {
  return (
    <div className='flex items-center space-x-2'>
        <div className='w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center'>
            <MdMapsHomeWork className='w-7 h-7 text-white'/>
        </div>
        <h1 className='text-xl sm:text-xl md:text-2xl font-semibold text-red-500'>
            Gharwa Development
        </h1>
    </div>
  )
}

export default Logo