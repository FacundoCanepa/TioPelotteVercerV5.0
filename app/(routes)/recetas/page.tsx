// app/(routes)/recetas/page.tsx
import { Metadata } from "next";
import RecetasSection from "./components/RecetasSection";

export const metadata: Metadata = {
  title: "Recetas Artesanales | TÍO PELOTTE",
  description: "Descubrí recetas deliciosas con nuestras pastas frescas artesanales. Ñoquis, ravioles, canelones y más, con todo el sabor casero de TÍO PELOTTE.",
  keywords: "recetas de pasta, recetas artesanales, ñoquis caseros, ravioles, canelones, cocina argentina, recetas familiares",
  openGraph: {
    title: "Recetas Artesanales | TÍO PELOTTE",
    description: "Recetas deliciosas con nuestros productos frescos. Preparaciones simples, caseras y llenas de sabor argentino.",
    url: "/recetas",
    siteName: "TÍO PELOTTE",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/recetas-opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Platos con pastas artesanales de TÍO PELOTTE",
      },
    ],
  },
};

export default function RecetasPage() {
  return <RecetasSection />;
}
