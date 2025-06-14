import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(function(){
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[finishRidePanel])

  return (
    <div className='h-screen relative flex flex-col justify-end'>
      <h5 className='p-1 text-center absolute top-0' onClick={() => {
          
        }}> <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src='/src/assets/images/uber_logo1.png' alt='' />
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'
      onClick={() => {
        setFinishRidePanel(true)
      }}>
      <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
          
        }}> <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
       <h4 className='text-xl font-semibold'>4 KM away</h4>
       <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>

       <div className='h-screen w-screen fixed top-0 z-[-1]'>
        <LiveTracking />
      </div>
    </div>
  )
}

export default CaptainRiding
