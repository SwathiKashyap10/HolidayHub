import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full h-full">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Message */}
      <p className="mt-4 text-lg font-medium text-gray-600 animate-pulse">
        Wait a moment please...
      </p>
    </div>
  )
}

export default Loading
