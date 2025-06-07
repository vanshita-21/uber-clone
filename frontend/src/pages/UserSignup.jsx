import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {UserDataContext} from '../context/UserContext';
import axios from 'axios';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext);
   
  const submitHandler =async(e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname,
        lastname
      },
      email,
      password
    }
console.log("newUser",newUser);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    console.log("response",response);
    
    if(response.status  == 201){
      localStorage.setItem('token', response?.data?.token);
      setUser(response?.data?.user);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-10' src='/src/assets/images/uber_logo1.png' />
          <form onSubmit={(e) => submitHandler(e)}>
              <h3 className='text-base font-medium mb-2'>What's your Name</h3>
              <div className='flex gap-4 mb-6'>
                <input
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='text' 
                placeholder='First name' 
                />
                <input
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='text' 
                placeholder='Last name' 
                />
              </div>

              <h3 className='text-base font-medium mb-2'>What's your email</h3>
              <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
              type='email' 
              placeholder='email@example.com' 
              />
              <h3 className='text-base font-medium mb-2'>Enter Password</h3>
              <input
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
              type='password' 
              placeholder='password' />
              <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                  Create Account
              </button>
              <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
          </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
