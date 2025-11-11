import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className='flex flex-col items-center justify-center py-10'>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">Loading news...</p>
    </div>
  )
}
