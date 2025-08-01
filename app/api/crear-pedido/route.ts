import { NextResponse } from "next/server";
import { addPedido } from "@/components/hooks/addPedidos";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await addPedido(body);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error interno al crear pedido";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}