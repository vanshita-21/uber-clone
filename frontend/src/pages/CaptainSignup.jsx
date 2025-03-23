import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const navigate = useNavigate();

  const {captain, setCaptain} = useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
    if(response.status  == 201){
      localStorage.setItem('token', response?.data?.token);
      setCaptain(response?.data?.captain);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-20 mb-3' src='/src/assets/images/uber_driver.png' />
          <form onSubmit={(e) => submitHandler(e)}>
              <h3 className='text-base w-full font-medium mb-2'>What's our  Captain's Name</h3>
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

              <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
              <div className='flex gap-4 mb-6'>
              <input
                required 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='text' 
                placeholder='Vehicle Color' 
              />
              <input
                required 
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='text' 
                placeholder='Vehicle Plate' 
              />
              </div>
              <div className='flex gap-4 mb-6'>
              <input
                required 
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='number' 
                placeholder='Vehicle Capacity' 
              />
              <select
                required 
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
                type='text' 
                placeholder='Vehicle Capacity'
              >
                <option value='' disabled >Select Vehicle Type</option>
                <option value='car'>Car</option>
                <option value='auto'>Auto</option>
                <option value='moto'>Moto</option>
              </select>
              </div>

              <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                  Create Account
              </button>
              <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
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

export default CaptainSignup
