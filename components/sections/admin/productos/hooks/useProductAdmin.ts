"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductType } from "@/types/product";
import { IngredientType } from "@/types/ingredient";
import { toast } from "sonner";
import { useImageUpload } from "./useImageUpload";

const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

interface ProductForm {
  id?: number;
  productName: string;
  slug: string;
  description: string;
  descriptionCorta: string;
  taste: string;
  unidadMedida: string;
  category: number | null;
  price: number;
  stock: number;
  porciones: string;
  tiempoEstimado: string;
  isOffer: boolean;
  isFeatured: boolean;
  active: boolean;
  ingredientes: number[];
  recetas: number[];
  img: { id: number } | null;
  imgPreview: string;
  img_carousel: { id: number }[];
  img_carousel_preview: string[];
  documentId?: string;
}

function defaultForm(): ProductForm {
  return {
    productName: "",
    slug: "",
    description: "",
    descriptionCorta: "",
    taste: "",
    unidadMedida: "",
    category: null,
    price: 0,
    stock: 0,
    porciones: "",
    tiempoEstimado: "",
    isOffer: false,
    isFeatured: false,
    active: true,
    ingredientes: [],
    recetas: [],
    img: null,
    imgPreview: "",
    img_carousel: [],
    img_carousel_preview: [],
  };
}

export function useProductAdmin() {
  const [productos, setProductos] = useState<ProductType[]>([]);
  const [ingredientes, setIngredientes] = useState<IngredientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterOffer, setFilterOffer] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [filterUnidad, setFilterUnidad] = useState("all");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [orderBy, setOrderBy] = useState({
    field: "productName",
    direction: "asc" as "asc" | "desc",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(defaultForm());
  
  const { uploadImages, loading: uploading } = useImageUpload();

  const fetchProductos = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/products");
      const json = await res.json();
      setProductos(Array.isArray(json?.data) ? json.data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIngredientes = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/ingredients");
      const json = await res.json();
      
      const data = Array.isArray(json.data) ? json.data : [];
      const ingredientes = data.map((i: any) => ({
        id: i.id,
        documentId: i.documentId,
        nombre: i.ingredienteName,
        stock: i.Stock,
        unidadMedida: i.unidadMedida,
        precio: i.precio,
        stockUpdatedAt: i.stockUpdatedAt,
        updatedAt: i.updatedAt,
      }));
      
      setIngredientes(ingredientes);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
      toast.error("Error al cargar ingredientes");
    }
  }, []);

  useEffect(() => {
    fetchProductos();
    fetchIngredientes();
  }, [fetchProductos, fetchIngredientes]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.productName),
    }));
  }, [form.productName]);

  const uploadMainImage = useCallback(async (files: FileList | File[]) => {
    const { ids, urls } = await uploadImages(files);
    if (ids[0]) {
      setForm((prev) => ({ ...prev, img: ids[0], imgPreview: urls[0] }));
    }
  }, [uploadImages]);

  const uploadCarouselImages = useCallback(async (files: FileList | File[]) => {
    const { ids, urls } = await uploadImages(files);
    if (ids.length) {
      setForm((prev) => ({
        ...prev,
        img_carousel: [...prev.img_carousel, ...ids],
        img_carousel_preview: [...prev.img_carousel_preview, ...urls],
      }));
    }
  }, [uploadImages]);

  const cleanPayload = (payload: any) => {
    return {
      ...payload,
      img: typeof payload.img === "object" && payload.img?.id
        ? payload.img.id
        : payload.img,
      img_carousel: Array.isArray(payload.img_carousel)
        ? payload.img_carousel.map((i: any) => i.id || i)
        : [],
      ingredientes: Array.isArray(payload.ingredientes)
        ? payload.ingredientes.map((i: any) => i.id || i)
        : [],
      recetas: Array.isArray(payload.recetas)
        ? payload.recetas.map((r: any) => r.id || r)
        : [],
    };
  };

  const saveProducto = async () => {
    try {
      const url = editingId
        ? `/api/admin/products/${form.documentId}`
        : "/api/admin/products";
      const method = editingId ? "PUT" : "POST";

      const { imgPreview, img_carousel_preview, ...rest } = form;
      if (!editingId) {
        delete (rest as any).documentId;
      }

      const payload = cleanPayload(rest);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Error al guardar: ${res.status}`);
      }

      toast.success("Guardado correctamente");
      setShowForm(false);
      setEditingId(null);
      setForm(defaultForm());
      fetchProductos();
      toast.error("Error al guardar el producto");
    }
  };

  const editProducto = (p: ProductType) => {
    setForm({
      ...p,
      ingredientes: Array.isArray(p.ingredientes)
        ? p.ingredientes.map((i) => i.id)
        : [],
      img: typeof p.img === "object" && p.img?.[0]?.id
        ? { id: p.img[0].id }
        : null,
      imgPreview: typeof p.img === "object" && p.img?.[0]?.url
        ? p.img[0].url.startsWith("/")
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${p.img[0].url}`
          : p.img[0].url
        : "",
      img_carousel: Array.isArray(p.img_carousel)
        ? p.img_carousel.map((i) => ({ id: i.id }))
        : [],
      img_carousel_preview: Array.isArray(p.img_carousel)
        ? p.img_carousel.map((i) =>
            i.url.startsWith("/")
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${i.url}`
              : i.url
          )
        : [],
      documentId: p.documentId,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const deleteProducto = async (documentId: string) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      const res = await fetch(`/api/admin/products/${documentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      toast.success("Producto eliminado");
      fetchProductos();
    } catch (err) {
      toast.error("Error al eliminar");
    }
  };

  const startNew = () => {
    setForm(defaultForm());
    setEditingId(null);
    setShowForm(true);
  };

  const unidades = Array.from(new Set(productos.map((p) => p.unidadMedida)));

  const filtered = productos
    .filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      filterOffer === "all"
        ? true
        : filterOffer === "offer"
        ? p.isOffer
        : !p.isOffer
    )
    .filter((p) =>
      filterActive === "all"
        ? true
        : filterActive === "active"
        ? p.active
        : !p.active
    )
    .filter((p) =>
      filterUnidad === "all" ? true : p.unidadMedida === filterUnidad
    )
    .filter((p) => (filterLowStock ? (p.stock || 0) <= 5 : true));

  const sorted = [...filtered].sort((a, b) => {
    const dir = orderBy.direction === "asc" ? 1 : -1;
    
    if (orderBy.field === "price" || orderBy.field === "stock") {
      const aValue = (a[orderBy.field as keyof ProductType] as number) || 0;
      const bValue = (b[orderBy.field as keyof ProductType] as number) || 0;
      return aValue > bValue ? dir : -dir;
    }
    
    if (orderBy.field === "updatedAt") {
      const aValue = new Date(a.updatedAt || 0).getTime();
      const bValue = new Date(b.updatedAt || 0).getTime();
      return aValue > bValue ? dir : -dir;
    }
    
    const aField = a[orderBy.field as keyof ProductType] || "";
    const bField = b[orderBy.field as keyof ProductType] || "";
    return String(aField).localeCompare(String(bField)) * dir;
  });

  return {
    productos: sorted,
    ingredientes,
    loading,
    search,
    setSearch,
    filterOffer,
    setFilterOffer,
    filterActive,
    setFilterActive,
    filterUnidad,
    setFilterUnidad,
    filterLowStock,
    setFilterLowStock,
    orderBy,
    setOrderBy,
    unidades,
    showForm,
    setShowForm,
    form,
    setForm,
    uploadMainImage,
    uploadCarouselImages,
    uploading,
    saveProducto,
    editProducto,
    deleteProducto,
    startNew,
  };
}