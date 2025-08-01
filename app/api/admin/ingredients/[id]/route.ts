import { NextRequest, NextResponse } from "next/server";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL!;
const token = process.env.STRAPI_PEDIDOS_TOKEN!;

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const data = {
      ingredienteName: body.ingredienteName,
      Stock: body.Stock,
      unidadMedida: body.unidadMedida,
      precio: body.precio,
    };

    const res = await fetch(`${backend}/api/ingredientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
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

    const res = await fetch(`${backend}/api/ingredientes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return new Response(null, { status: 204 });
    }

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}