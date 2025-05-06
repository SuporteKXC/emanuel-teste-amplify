import { api } from "@/services";

export async function deleteHoliday(id:number){
    const response = await api.delete(`/holiday/${id}`)
    return response
}