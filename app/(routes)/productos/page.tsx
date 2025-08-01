import ProductosSection from "./components/ProductosSection";

export const metadata = {
  title: "Productos Artesanales - Pastas Frescas | TÍO PELOTTE",
  description: "Descubrí nuestras pastas frescas y ofertas semanales. Comprá ravioles, sorrentinos, fideos, ñoquis y más. Envíos a domicilio en La Plata y alrededores.",
  keywords: "pastas frescas, ravioles, sorrentinos, fideos, ñoquis, canelones, productos artesanales, La Plata, Buenos Aires",
  openGraph: {
    title: "Productos Artesanales - Pastas Frescas | TÍO PELOTTE",
    description: "Comprá pastas artesanales frescas con envío a domicilio en La Plata y alrededores.",
    url: "/productos",
    siteName: "TÍO PELOTTE",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/productos-opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Productos Artesanales TÍO PELOTTE",
      },
    ],
  },
};

export default function ProductosPage() {
  return <ProductosSection />;
}
