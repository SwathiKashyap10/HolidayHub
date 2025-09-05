import React from 'react'
import { useLocation } from 'react-router-dom';

const RoomCard = ({roomData}) => {
  const location = useLocation();
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
      
      {/* room image */}
      <div>
        <img 
          src={roomData.images[0]} 
          alt="room image" 
          className="w-full h-44 sm:h-54 md:h-52 lg:h-72 object-cover"
        />
      </div>

      {/* room description */}
      <div className="p-4 sm:p-5">
        <div>
          <p className="text-xs sm:text-sm md:text-sm text-gray-600 mb-2">{roomData.hotel.city}</p>
          <span className="text-2xl font-semibold">{roomData.hotel.name}</span>&nbsp;
          <span className='text-md text-gray-600'>({roomData.numberOfBeds == 1 ? "Twin Beds" :  "Double bed"})</span>
          <p className="text-xs sm:text-sm md:text-md">
            <i className="fa-solid fa-location-dot"></i>{roomData.hotel.address}
          </p>
          <p className='mt-7 mb-3 text-gray-600 text-lg'>&#x20B9;{roomData.pricePerNight}/night</p>
        </div>
        <button className='border border-2-black hover:bg-black hover:text-white transition-all rounded-md py-1 px-4'>
          {location.pathname.startsWith('/admin') ? "Manage rooms" : "Book now"}
        </button>
      </div>
</div>

  )
}

export default RoomCard
