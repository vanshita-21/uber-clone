import React from 'react'

const LocationSearchPanel = ({suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, setActiveField, activeField}) => {

  const handleSuggestionClick = (suggestion) => {
    if(activeField == 'pickup'){
      setPickup(suggestion)
    } else if(activeField == 'destination'){
      setDestination(suggestion)
    }
    
  }
 
  return (
    <div>
      {suggestions.map((elem, index) => (
        <div key={index} onClick={() => handleSuggestionClick(elem?.description)} 
          className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-4 justify-start gap-4'>
          <h2 className='bg-[#eee] flex items-center justify-center h-8 w-12 rounded-full'>
          <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className='font-medium'>{elem.description}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
