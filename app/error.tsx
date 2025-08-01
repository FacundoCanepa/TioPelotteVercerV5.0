'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#FBE6D4] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold text-[#8B4513] font-garamond">
          ¡Ups! Algo salió mal
        </h2>
        <p className="text-[#5A3E1B]">
          Ocurrió un error inesperado mientras preparábamos tu pedido. 
          Por favor, intentá nuevamente.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#FFD966] hover:bg-[#f5c741] text-[#5A3E1B] px-6 py-2 rounded-md font-semibold transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  )
}