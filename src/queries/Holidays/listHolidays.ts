import type { Holiday } from "@/pages/General/Configurador/holidays/holiday";
import { api } from "@/services";

export async function listHolidays() {
  const { data } = await api.get<Holiday[]>("/holiday/");
  return data;
}