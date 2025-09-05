import React, { useState } from 'react'

const RoomsHeader = () => {
  return (
    <div className="text-center pt-8">
      {/* Title */}
      <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-800 mb-3">
        Find Your Perfect Stay!
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-sm:text-sm max-w-xl mx-auto max-sm:px-4 mb-8  pt-2 pb-5">
        Browse our collection of hotels, resorts, and luxury rooms across top cities. Book effortlessly and make your stay comfortable and stress-free.
      </p>
    </div>
  )
}

export default RoomsHeader
