import { OrderItemData } from "@/contracts";
import { api } from "@/services";

export async function searchOrderItem(order: string): Promise<OrderItemData[]> {
  const { data } = await api.get<OrderItemData[]>(`/order-item/search?order=${order}`);
  return data;
}