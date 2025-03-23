import React from 'react'

const LocationSearchPanel = ({setPanelOpen, setVehiclePanel}) => {

  const locations = [
    "24B, panchayat chawk, pathik nagar-2, Bijoliya, Bhilwara",
    "22C, Near Kapoor's cafe, Coding school, Bhopal",
    "99B, near mining office, pathik nagar, Bhilwara, Bhilwara"
  ]
  return (
    <div>
      {locations.map((elem, index) => (
        <div key={index} onClick={() => {
          setVehiclePanel(true);
          setPanelOpen(false)
        }} className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-4 justify-start gap-4'>
          <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full'>
          <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
