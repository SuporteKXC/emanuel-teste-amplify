import { DataTable } from "@/components/ui/DataTable"
import { useDataTableColumns } from "./columns"
import { InnerNavigator, InnerNavigatorOption } from "@/components/ui/InnerNavigator"
import { usePermission } from "@/hooks"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { listHolidays } from "@/queries/Holidays/listHolidays"



const List = () => {
    const {columns } = useDataTableColumns()
    const {hasPermissionTo} = usePermission()
    const { data, isPending } = useQuery({
      queryKey: ["holidays-index"],
      queryFn: listHolidays
    })
    const navigatorOptions: InnerNavigatorOption[] = useMemo(()=>[
      {
        title: "Feriados",
        route: "/config/holidays",
        hasPermission: hasPermissionTo("LISTHOLIDAY"),
      },
      {
        title: "Novo feriado",
        route: "/config/holidays/novo",
        hasPermission: hasPermissionTo("CREATEHOLIDAY"),
      },
    ],[hasPermissionTo]);
    
  return (
    <section className="w-full flex flex-col gap-6">
        <InnerNavigator options={navigatorOptions}/>
        <DataTable
        data={data || []}
        isLoading={isPending}
        filterBy={"Feriado"}
        filterByDate={"Data"}
         columns={columns}/>
</section>
  )
}

export default List