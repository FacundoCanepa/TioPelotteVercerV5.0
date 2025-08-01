export interface Category {
  id: number;
  documentId: string;
  categoryNames: string;
  slug: string;
  description: string;
  mainImage: {
    id: number;
    url: string;
    alternativeText?: string;
  };
}