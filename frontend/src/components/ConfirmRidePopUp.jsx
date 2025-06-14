import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = ({ride, setConfirmRidePopupPanel, setRidePopupPanel}) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`,{
      params : {rideId: ride._id,
      otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status === 200){
      setConfirmRidePopupPanel(false);
      setRidePopupPanel(false);
      navigate('/captain-riding', {state: {ride: ride}});
    }

  }
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0' onClick={() => {
          setRidePopupPanel(false)
        }}> <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/previews/016/766/342/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-transparent-background-png.png" alt="" />
                <h2 className='text-lg font-medium capitalize'>{ride?.user?.fullname?.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className='ri-map-pin-user-fill'></i>
                  <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                  <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                  <i className='ri-currency-line'></i>
                    <div>
                      <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                      <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
            <div className='mt-6 w-full'>
              <form onSubmit={submitHandler}>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} type='text' placeholder='Enter OTP' className='bg-[#eee] px-6 py-4 font-mono rounded-lg w-full mt-5' />
                <button to='/captain-riding' className='w-full flex justify-center text-lg mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg' >Confirm</button>
                
                <button onClick={() =>{
                  setConfirmRidePopupPanel(false)
                  setRidePopupPanel(false)
                }} className='w-full mt-1 text-lg bg-red-600 text-white font-semibold p-3 rounded-lg' >Cancel</button>
 
              </form>
            </div>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp
