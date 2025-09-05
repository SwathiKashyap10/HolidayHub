import React, { useState } from 'react'

const ManageBookingsCard = ({booking}) => {
  return (
    <div className="relative grid grid-cols-2 gap-4 w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
      
      {/* car image */}
      <div>
        <img 
          src={booking.room.images[0]} 
          alt="room image" 
          className="w-full h-44 sm:h-54 md:h-52 lg:h-72 object-cover"
        />
      </div>

      {/* car description */}
      <div className="p-4 sm:p-5">
        <div>
          <p className="text-xs sm:text-sm md:text-sm text-gray-600 mb-2">{booking.hotel.city}</p>
          <span className="text-2xl font-semibold">{booking.hotel.name}</span>&nbsp;
          <span className='text-md text-gray-600'>({booking.room.numberOfBeds == 1 ? "Twin Beds" :  "Double bed"})</span>
          <p className="text-xs sm:text-sm md:text-md"><i class="fa-solid fa-location-dot"></i>{booking.hotel.address}</p>
          <p className='mt-7 mb-3 text-gray-600 text-lg'>&#x20B9;{booking.room.pricePerNight}/night</p>
        </div>
        <button className='border border-2-black hover:bg-black hover:text-white transition-all rounded-md py-1 px-4'>Manage booking</button>
      </div>
    </div>
  )
}

export default ManageBookingsCard



