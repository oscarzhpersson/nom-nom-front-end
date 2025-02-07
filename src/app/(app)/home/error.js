'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
        <p className="text-lg text-gray-700">
          Something went wrong. Please try again later.
        </p>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600 mb-2">Error details:</p>
          <pre className="text-xs text-red-600 overflow-x-auto">
            {error.message}
          </pre>
        </div>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
