import React from 'react'

const ConfirmRide = ({pickup, destination, fare, vehicleType, createRide,setConfirmRidePanel, setVehicleFound}) => {
  return (
    <div>
       <h5 className='p-1 text-center absolute top-0' onClick={() => {
          setConfirmRidePanel(false)
        }}> <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png' alt='' />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className='ri-map-pin-user-fill'></i>
                  <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                  <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                  <i className='ri-currency-line'></i>
                    <div>
                      <h3 className='text-lg font-medium'>₹{fare[vehicleType]}</h3>
                      <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
                </div>
            </div>
            <button onClick={() =>{
              setVehicleFound(true)
              setConfirmRidePanel(false);
              createRide();
            }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg' >Confirm</button>

        </div>
    </div>
  )
}

export default ConfirmRide
