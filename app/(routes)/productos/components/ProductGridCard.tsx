"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";

interface Props {
  product: ProductType;
}

const ProductGridCard = ({ product }: Props) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const unidad = product.unidadMedida?.trim().toLowerCase() || "";
  const isByWeight = unidad === "kg";
  const step = isByWeight ? 0.25 : 1;
  const min = isByWeight ? 0.25 : 1;

  const [quantity, setQuantity] = useState<number>(min);

  // Early return after hooks to avoid conditional hook calls
  if (!product?.productName) return null;

  const toFixedStep = (val: number) => Math.round(val * 100) / 100;

  const increment = () => setQuantity((prev) => toFixedStep(prev + step));
  const decrement = () =>
    setQuantity((prev) => (prev > min ? toFixedStep(prev - step) : prev));

  const formatQuantity = (qty: number) => {
    if (unidad === "unidad") return `${qty} Unidad`;
    if (unidad === "planchas") return `${qty} Planchas`;
    return `${qty}`;
  };

  const displayUnit =
    unidad === "kg"
      ? " /kg"
      : unidad === "unidad"
      ? " /unidad"
      : unidad === "planchas"
      ? " /planchas"
      : "";

  return (
    <Card className="bg-[#FFF4E3] border-none rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full">
      <CardContent className="flex flex-col justify-between h-full p-4">
        <div className="relative overflow-hidden rounded-xl h-[21rem] md:h-48 w-full">
          {product.isOffer && (
            <span className="absolute top-2 left-2 bg-[#FFD966] text-[#8B4513] text-[11px] font-bold px-2 py-1 rounded-full shadow z-10">
              OFERTA
            </span>
          )}
          <Image
            src={product.img?.[0]?.url || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4="}
            alt={product.productName}
            width={300}
            height={300}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4=";
            }}
          />
        </div>

        <div className="flex flex-col flex-grow justify-between gap-2 mt-4">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-1 text-lg font-garamond italic text-[#8B4513]">
              {product.productName}
            </h3>

            <p className="text-sm text-stone-600 line-clamp-2">
              {product.description}
            </p>

            <span className="text-[#D16A45] font-semibold text-base">
              ${product.price.toLocaleString("es-AR")}
              <span className="text-sm text-stone-500">{displayUnit}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={decrement}
              aria-label="Restar cantidad"
              className="cursor-pointer min-w-[2rem] px-2 py-1 rounded bg-[#FFD966] text-[#8B4513] font-bold hover:bg-[#f5c741]"
            >
              –
            </button>
            <span className="text-sm font-medium w-20 text-center">
              {formatQuantity(quantity)}
            </span>
            <button
              onClick={increment}
              aria-label="Sumar cantidad"
              className="cursor-pointer min-w-[2rem] px-2 py-1 rounded bg-[#FFD966] text-[#8B4513] font-bold hover:bg-[#f5c741]"
            >
              +
            </button>
          </div>

          <Button
            onClick={() => addToCart(product, quantity)}
            className="bg-[#FFD966] text-[#8B4513] hover:bg-[#6B8E23] mt-2"
          >
            Añadir al carrito
          </Button>

          <Button
            onClick={() => router.push(`/productos/${product.slug}`)}
            variant="outline"
            className="border border-[#8B4513] text-[#8B4513] hover:bg-[#FFD966] mt-1"
          >
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductGridCard;
