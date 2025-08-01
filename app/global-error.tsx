'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#FBE6D4] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#8B4513]">¡Ups! Algo salió mal</h2>
          <p className="text-[#5A3E1B]">
            Ocurrió un error inesperado. Por favor, intentá nuevamente.
          </p>
          <button
            onClick={() => reset()}
            className="bg-[#FFD966] hover:bg-[#f5c741] text-[#5A3E1B] px-6 py-2 rounded-md font-semibold transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </body>
    </html>
  )
}