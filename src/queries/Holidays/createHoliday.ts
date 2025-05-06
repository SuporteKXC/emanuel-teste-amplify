import { Holiday } from "@/pages/General/Configurador/holidays/holiday";
import type { HolidayType } from "@/pages/General/Configurador/holidays/schema";
import { api } from "@/services";

export async function createHoliday(data: HolidayType) {
    const { data: created } = await api.post<Holiday>("/holiday/",data);
      return created;
}