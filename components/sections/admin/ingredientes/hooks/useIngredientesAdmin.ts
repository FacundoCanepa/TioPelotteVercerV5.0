"use client";

import { useEffect, useState, useCallback } from "react";
import { IngredientType } from "@/types/ingredient";
import { toast } from "sonner";
import { generateSlug } from "@/lib/utils";

interface IngredientForm {
  id?: number;
  nombre: string;
  stock: number;
  unidadMedida: string;
  precio: number;
  documentId?: string;
}

export function useIngredientesAdmin() {
  const [ingredientes, setIngredientes] = useState<IngredientType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterUnidad, setFilterUnidad] = useState("all");
  const [filterLowStock, setFilterLowStock] = useState(false);

  const [orderBy, setOrderBy] = useState({
    field: "nombre",
    direction: "asc" as "asc" | "desc",
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<IngredientForm>({
    nombre: "",
    stock: 0,
    unidadMedida: "kg",
    precio: 0,
  });

  const unidades = ["kg", "planchas", "unidad"];

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
    } catch (error) {
      toast.error("Error al cargar ingredientes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIngredientes();
  }, [fetchIngredientes]);

  const saveIngrediente = async () => {
    try {
      const isNew = !form.id;

      const payload = {
        ingredienteName: form.nombre,
        Stock: form.stock,
        unidadMedida: form.unidadMedida,
        precio: form.precio,
        documentId: isNew ? generateSlug(form.nombre) : form.documentId,
      };

      const url = isNew
        ? "/api/admin/ingredients"
        : `/api/admin/ingredients/${form.documentId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar");

      toast.success(isNew ? "Ingrediente creado" : "Ingrediente editado");
      setShowForm(false);
      fetchIngredientes();
    } catch (error) {
      toast.error("Error al guardar ingrediente");
    }
  };

  const deleteIngrediente = async (documentId: string) => {
    try {
      const res = await fetch(`/api/admin/ingredients/${documentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      toast.success("Ingrediente eliminado");
      fetchIngredientes();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const editIngrediente = (i: IngredientType) => {
    setForm({
      id: i.id,
      nombre: i.nombre,
      stock: i.stock,
      unidadMedida: i.unidadMedida,
      precio: i.precio,
      documentId: i.documentId,
    });

    setShowForm(true);
  };

  const startNew = () => {
    setForm({
      nombre: "",
      stock: 0,
      unidadMedida: "kg",
      precio: 0,
    });
    setShowForm(true);
  };

  const filteredIngredientes = ingredientes
    .filter((i) =>
      i.nombre.toLowerCase().includes(search.toLowerCase())
    )
    .filter((i) => (filterUnidad === "all" ? true : i.unidadMedida === filterUnidad))
    .filter((i) => (filterLowStock ? i.stock <= 5 : true))
    .sort((a, b) => {
      const aValue = a[orderBy.field as keyof IngredientType];
      const bValue = b[orderBy.field as keyof IngredientType];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return orderBy.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue || "");
      const bStr = String(bValue || "");
      
      if (orderBy.direction === "asc") {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });

  return {
    ingredientes: filteredIngredientes,
    loading,
    search,
    setSearch,
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
    saveIngrediente,
    editIngrediente,
    deleteIngrediente,
    startNew,
  };
}