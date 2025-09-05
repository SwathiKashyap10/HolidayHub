import React from 'react'

const Header = ({heading,paragraph}) => {
  return (
    <div className="text-center pt-10 pb-5">
      {/* Title */}
      <h2 className="text-3xl max-sm:text-2xl font-bold text-gray-800 mb-3">
        {heading}
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-sm:text-sm max-w-xl mx-auto mb-8">
        {paragraph}
      </p>
    </div>
  )
}

export default Header
