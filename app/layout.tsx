import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { islandMoments, ebGaramond } from "@/lib/fonts/fonts";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CartFloatButton from "@/components/ui/CartFloatButton";
import { Toaster } from "sonner";
import UserSessionLoader from "@/components/providers/UserSessionLoader";

export const metadata: Metadata = {
  title: "TÍO PELOTTE - Pastas Artesanales Frescas | La Plata, Buenos Aires",
  description: "Pastas artesanales frescas hechas con amor en La Plata. Ravioles, sorrentinos, ñoquis y más. Envíos a domicilio en Abasto, Olmos, Los Hornos y Etcheverry. Más de 30 años de tradición familiar.",
  keywords: "pastas artesanales, ravioles, sorrentinos, ñoquis, La Plata, Buenos Aires, pasta fresca, delivery, comida casera, tradición familiar",
  authors: [{ name: "TÍO PELOTTE" }],
  creator: "TÍO PELOTTE",
  publisher: "TÍO PELOTTE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tiopelotte.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TÍO PELOTTE - Pastas Artesanales Frescas",
    description: "Pastas artesanales frescas hechas con amor en La Plata. Más de 30 años de tradición familiar. Envíos a domicilio.",
    url: "https://tiopelotte.com",
    siteName: "TÍO PELOTTE",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "TÍO PELOTTE - Pastas Artesanales Frescas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TÍO PELOTTE - Pastas Artesanales Frescas",
    description: "Pastas artesanales frescas hechas con amor en La Plata. Más de 30 años de tradición familiar.",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FBE6D4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
        <body className={`${islandMoments.variable} ${ebGaramond.variable} antialiased`}>
            <UserSessionLoader />
            <Navbar />
          {children}
          <Toaster position="top-center" richColors closeButton />
          <Footer />
          <CartFloatButton/>
          <WhatsAppButton/>
      </body>
    </html>
  );
}