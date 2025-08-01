"use client";
import Link from "next/link";
import Image from "next/image";

const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
const imageNotFound = `${mediaUrl}/Chat_GPT_Image_22_jul_2025_12_17_20_ff51bcaabb.png`;

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBE6D4] text-[#8B4513] px-6">
      <div className="mb-8 flex flex-col items-center">
        <Image
          src={imageNotFound || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4="}
          alt="Tío Pelotte buscando la página"
          width={300}
          height={300}
          className="mb-4"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4=";
          }}
        />
        <h1 className="text-4xl sm:text-5xl font-garamond font-bold mb-4 text-center">
          Ni el Tío Pelotte encontró esta página...
        </h1>
        <p className="text-lg sm:text-xl font-garamond mb-3 italic text-center">
          Y eso que revisó bien entre las recetas.
        </p>
        <p className="text-base text-stone-700 mb-6 text-center">
          Capaz se quedó sin harina. Pero no te preocupes, hay otras delicias listas para servir.
        </p>
        <Link
          href="/"
          className="bg-[#FFD966] px-6 py-2 rounded-md text-[#5A3E1B] font-semibold hover:bg-[#f5c741] transition"
        >
          Volver al comienzo 🍝
        </Link>
      </div>
      <div className="text-center text-xs text-stone-500 mt-10">
        &copy; Tío Pelotte, 2025. Pastas frescas y errores frescos.
      </div>
    </div>
  );
}