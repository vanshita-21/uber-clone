import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FinishRide = ({rideData, setFinishRidePanel}) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`, {
      rideId: rideData._id
    },{
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response?.status == 200){
      Navigate('/captain-home')
    }
  }
  return (
    <div>
    <h5 className='p-1 text-center absolute top-0' onClick={() => {
        setFinishRidePanel(false)
      }}> <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
      <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
          <div className='flex items-center gap-3'>
              <img className='h-12 w-12 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/previews/016/766/342/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-transparent-background-png.png" alt="" />
              <h2 className='text-lg font-medium'>{rideData?.user?.fullname?.firstname}</h2>
          </div>
          <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className='ri-map-pin-user-fill'></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{rideData?.pickup}</p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className='text-lg ri-map-pin-2-fill'></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{rideData?.destination}</p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3'>
                <i className='ri-currency-line'></i>
                  <div>
                    <h3 className='text-lg font-medium'>₹{rideData?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                  </div>
              </div>
          </div>
          <div className='mt-10 w-full'>
              <button onClick={endRide} className='w-full flex justify-center mt-5 text-lg bg-green-600 text-white font-semibold p-3 rounded-lg' >Finish Ride</button>
              {/* <p className='mt-10 text-xs'>Click on finish ride button if you have completed the payment.</p> */}
          </div>
      </div>
  </div>
  )
}

export default FinishRide
