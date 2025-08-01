import { PedidoType } from "./pedido";

export interface UserType {
  id: number;
  username: string;
  email: string;
  role?: string;
  telefono?: string;
  zona?: string;
  direccion?: string;
  referencias?: string;
  createdAt?: string;
  updatedAt?: string;
  pedidos?: PedidoType[];
}