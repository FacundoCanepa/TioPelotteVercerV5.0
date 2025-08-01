import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const {
      documentId,
      createdAt,
      updatedAt,
      publishedAt,
      img,
      img_carousel,
      category,
      recetas,
      ingredientes,
      ...rest
    } = body;

    const cleanBody = {
      ...rest,
      img: typeof img === "object" && img?.[0]?.id ? img[0].id : img,
      img_carousel: Array.isArray(img_carousel) ? img_carousel.map((i: any) => i.id) : [],
      category: typeof category === "object" ? category.id : category,
      recetas: Array.isArray(recetas) ? recetas.map((r: any) => r.id) : [],
      ingredientes: Array.isArray(ingredientes) ? ingredientes.map((i: any) => i.id) : [],
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_PEDIDOS_TOKEN}`,
        },
        body: JSON.stringify({ data: cleanBody }),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_PEDIDOS_TOKEN}`,
      },
    });

    if (res.status === 204) {
      return new Response(null, { status: 204 });
    }
    
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}