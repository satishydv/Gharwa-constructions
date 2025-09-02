import React from 'react'
import { MdMapsHomeWork } from "react-icons/md";

const Logo = () => {
  return (
    <div className='flex items-center space-x-2'>
        <div className='w-10 h-10 bg-yellow-500 dark:bg-white rounded-full flex items-center justify-center'>
            <MdMapsHomeWork className='w-7 h-7 text-white dark:text-black'/>
        </div>
        <h1 className='text-xl hidden sm:block md:text-2xl font-semibold text-red-500 dark:text-white'>
            Gharwa Development
        </h1>
    </div>
  )
}

export default Logo