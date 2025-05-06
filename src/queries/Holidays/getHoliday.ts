import type { Holiday } from "@/pages/General/Configurador/holidays/holiday";
import { api } from "@/services";

export async function getHoliday(id: number) {
  const { data } = await api.get<Holiday>(`/holiday/${id}`);
  return data;
}