import { ExportOrderItem } from "@/contracts/exportOrder";
import {  apiComexExport } from "@/services";

export async function searchExportOrderItem(order: string): Promise<ExportOrderItem[]> {
  const { data } = await apiComexExport.get<ExportOrderItem[]>(`/export-order-item/search?order=${order}`);
  return data;
}