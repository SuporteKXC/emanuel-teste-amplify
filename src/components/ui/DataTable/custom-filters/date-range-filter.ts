import { Row } from "@tanstack/react-table";
import { DateTime, Interval } from "luxon";

export const isBetween = <TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: {from: string, to: string}
)=>{
    const dateFrom = DateTime.fromJSDate(new Date(filterValue.from))
    const dateTo = filterValue.to ? DateTime.fromJSDate(new Date(filterValue.to)) : DateTime.fromJSDate(new Date())
    const dateRow = DateTime.fromISO(row.getValue<string>(columnId))
    if(!dateRow) return false

    const interval =  Interval.fromDateTimes(dateFrom, dateTo)

    return interval.contains(dateRow)
}