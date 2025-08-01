import RecipeDetail from "./components/RecipeDetail";

type Props = { params: { recetasSlug: string } };

// ✅ Metadata genérica para todas las recetas
export const metadata = {
  title: "Receta artesanal | TÍO PELOTTE",
  description: "Una receta deliciosa hecha con ingredientes frescos y amor artesanal. Descubrí el sabor casero de TÍO PELOTTE.",
  keywords: "receta artesanal, pasta casera, cocina argentina, recetas familiares, ingredientes frescos",
  openGraph: {
    title: "Receta artesanal | TÍO PELOTTE",
    description: "Disfrutá de nuestras recetas clásicas y caseras. Hechas con pasión y tradición familiar argentina.",
    type: "article",
    locale: "es_AR",
    images: [
      {
        url: "/receta-opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Receta artesanal de TÍO PELOTTE",
      },
    ],
  },
};

export default function Page({ params }: Props) {
  return <RecipeDetail slug={params.recetasSlug} />;
}
