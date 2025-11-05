import React from 'react'

type loadingState = {
  loading: boolean
}

const Loading = ({ loading }: loadingState) => {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-500 ${loading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="text-center">
        {/* Modern Spinner */}
        {/* <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div> */}

        {/* Animated Dots */}
        <div className="flex space-x-3 justify-center mb-6">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '150ms' }}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Loading</h3>
        <p className="text-gray-600 text-sm animate-pulse">Preparing your amazing experience...</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading