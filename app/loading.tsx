import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FBE6D4] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B4513] mx-auto" />
        <p className="text-[#5A3E1B] font-garamond italic">
          Cargando las delicias de TÍO PELOTTE...
        </p>
      </div>
    </div>
  )
}