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
    
    console.log("📥 PUT recibido body:", body);
    console.log("🆔 Params (documentId):", id);

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
    console.log("✅ Respuesta PUT:", json);
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error("🔥 Error en PUT:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    console.log("🗑️ DELETE recibido para:", id);

    const res = await fetch(`${backend}/api/ingredientes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      console.log("✅ Ingrediente eliminado correctamente");
      return new Response(null, { status: 204 });
    }

    const json = await res.json();
    console.log("⚠️ Respuesta DELETE (no 204):", json);
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error("🔥 Error en DELETE:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}