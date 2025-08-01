import { useEffect, useState, useCallback } from "react";
import { ProductType } from "@/types/product";
import { Category } from "@/types/category";
import { useGetAllProducts } from "./useGetAllProducts";
import { useGetCategory } from "./useGetCategory";

interface Filters {
  search: string;
  category: string;
  sort: string;
  onlyOffers: boolean;
  unidad: string;
  priceRange: [string, string];
}

export function useFilteredProducts() {
  const { result: allProducts = [], loading: loadingProducts } = useGetAllProducts();
  const { result: categories = [], loading: loadingCategories } = useGetCategory();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    sort: "",
    onlyOffers: false,
    unidad: "",
    priceRange: ["", ""],
  });

  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  const filterProducts = useCallback(() => {
    if (!allProducts.length) {
      setFiltered([]);
      setLoading(false);
      return;
    }

    let result = [...allProducts];

    if (filters.search) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category?.slug === filters.category);
    }

    if (filters.onlyOffers) {
      result = result.filter((p) => p.isOffer === true);
    }

    if (filters.unidad) {
      result = result.filter((p) => p.unidadMedida?.trim().toLowerCase() === filters.unidad);
    }

    const min = filters.priceRange[0] ? Number(filters.priceRange[0]) : null;
    const max = filters.priceRange[1] ? Number(filters.priceRange[1]) : null;

    if (min !== null) {
      result = result.filter((p) => p.price >= min);
    }
    if (max !== null) {
      result = result.filter((p) => p.price <= max);
    }

    if (filters.sort === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      setFiltered(result);
      setCurrentPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, allProducts]);

  useEffect(() => {
    const cleanup = filterProducts();
    return cleanup;
  }, [filterProducts]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return {
    products: paginated,
    totalFiltered: filtered.length,
    filters,
    setFilters,
    categories,
    currentPage,
    setPage: setCurrentPage,
    totalPages,
    loading: loading || loadingProducts || loadingCategories,
  };
}