import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, context: RouteParams) {
  try {
    const { id: documentId } = await context.params;
    const body = await req.json();

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = process.env.STRAPI_PEDIDOS_TOKEN;

    const url = `${backendUrl}/api/pedidos/${documentId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: body }),
    });

    const json = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: json.error }, { status: response.status });
    }

    return NextResponse.json(json);
  } catch (err) {
    console.error("❌ Error en PUT /api/pedidos/[id]:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}