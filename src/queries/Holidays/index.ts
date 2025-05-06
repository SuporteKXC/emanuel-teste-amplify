import { createHoliday } from "./createHoliday";
import { deleteHoliday } from "./deleteHoliday";
import { getHoliday } from "./getHoliday";
import { listHolidays } from "./listHolidays";
import { updateHoliday } from "./updateHoliday";

export const HolidayApi = {
    createHoliday,
    listHolidays,
    updateHoliday,
    deleteHoliday,
    getHoliday
}