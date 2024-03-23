import React from 'react'
//params let u get the url item
const Profileslug = ({params}:any) => {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
        <p className=' text-4xl'>Profile page-
        <span className='  ml-2 p-2 rounded bg-orange-500'>{params.id}</span></p>
    </div>
  )
}

export default Profileslug