import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://media.istockphoto.com/id/1396630169/photo/speedy-service.jpg?s=2048x2048&w=is&k=20&c=x25ksuTJaAwCwaS1NIRUOL_8idrJy-ssYkzyCD8ALyQ=)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src='/src/assets/images/uber_logo.png' />
        <div className='bg-white py-4 pb-7 px-4'>
          <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
