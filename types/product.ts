export interface ProductType {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  descriptionCorta: string | null;
  img: {
    id: number;
    url: string;
    alternativeText?: string;
  }[];
  img_carousel?: {
    id: number;
    url: string;
    alternativeText?: string;
  }[];
  unidadMedida: string;
  taste: string;
  price: number;
  active: boolean;
  isFeatured: boolean | null;
  isOffer: boolean | null;
  category: {
    id: number;
    categoryNames: string;
    slug: string;
  };
  ingredientes?: {
    id: number;
    ingredienteName: string;
  }[];
  porciones?: string;
  tiempoEstimado?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}