export interface RecetaType {
  id: number;
  documentId: string;
  titulo: string;
  slug: string;
  descripcion: string;
  tiempo: string;
  porciones: string;
  preparacion: string;
  img: {
    id: number;
    url: string;
    alternativeText?: string;
    caption?: string;
  } | null;
  products: {
    id: number;
    productName: string;
    slug: string;
    price?: number;
    img: {
      id: number;
      url: string;
      alternativeText?: string;
    }[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}