import {
  InnerNavigator,
  InnerNavigatorOption,
} from "@/components/ui/InnerNavigator";
import React from "react";
import { ExportLayout } from "../layout";
import DataFilter from "./DataFilter";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import useListExportOrders from "@/queries/ExportOrder/listExportOrders";

const navigatorOptions: InnerNavigatorOption[] = [
  {
    title: "Operacional",
    route: "",
    hasPermission: true,
  },
];
export const Operacional: React.FC = () => {
  const { columns, selectExportOrder } = useColumns();
  const { data, isLoading } = useListExportOrders();
  return (
    <ExportLayout>
      {/* <DataFilter /> */}
      <DataTable filterBy={"numero"} filterByDate={['Dt.Registro']} isLoading={isLoading} columns={columns} data={data || []} />
    </ExportLayout>
  );
};
