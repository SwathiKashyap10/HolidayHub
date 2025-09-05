import React, { useState } from 'react'

const MyBookingsHeader = () => {
  return (
    <div className="text-center pt-12">
      {/* Title */}
      <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-800 mb-3">
        My Bookings
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-sm:text-sm max-w-xl mx-auto max-sm:px-4 mb-8  pt-2 pb-5">
        Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks
      </p>
    </div>
  )
}

export default MyBookingsHeader




