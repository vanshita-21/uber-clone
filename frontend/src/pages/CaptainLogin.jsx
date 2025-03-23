import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const {captain, setCaptain} = useContext(CaptainDataContext);

    const submitHandler = async(e) => {
        e.preventDefault();
        const captainData = {
            email,
            password
          }
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
          if(response.status  == 200){
            localStorage.setItem('token', response?.data?.token);
            setCaptain(response?.data?.captain);
            navigate('/captain-home');
          }
      

        setEmail('');
        setPassword('');
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-20 mb-3' src='/src/assets/images/uber_driver.png' />
            <form onSubmit={(e) => submitHandler(e)}>
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='email' 
                placeholder='email@example.com' 
                />
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='password' 
                placeholder='password' />
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Login
                </button>
                <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </form>
        </div>
        <div>
            <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                Sign in as User
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
