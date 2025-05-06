import { HolidayType } from "@/pages/General/Configurador/holidays/schema"
import { api } from "@/services"

export async function updateHoliday(id:number, data: HolidayType){
    const {data: updated} = await api.put(`/holiday/${id}`,data)
    return updated
}