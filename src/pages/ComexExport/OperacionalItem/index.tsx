import React from "react";
import { ExportLayout } from "../layout";
import { DataTable } from "@/components/ui/DataTable";
import { useColumns } from "./columns";
import useListExportOrderItens from "@/queries/ExportOrderItens/listExportOrders";
import { ExportOrderItem } from "@/contracts";
import { z } from "zod";

const channelSchema = z.object({
  channel: z.enum(["VERMELHO", "AMARELO", "VERDE"]).optional(),
})

export const OperacionalItem: React.FC = () => {
  const { columns } = useColumns();
  const { data, isLoading } = useListExportOrderItens();

  const setChannelStyle = (item: ExportOrderItem) => {
    if (!item?.channel) return { item_table_row: "" };

    let channel = item?.channel?.toUpperCase()

    const validateChannel = channelSchema.safeParse({ channel })

    if (!validateChannel.success) return { item_table_row: "" }
  
    const channelColors: { [key: string]: { bg: string, hover: string } } = {
      VERMELHO: { bg: "bg-red-200", hover: " hover:bg-red-100" },
      AMARELO: { bg: "bg-amber-200", hover: " hover:bg-amber-100" },
      VERDE: { bg: "", hover: "" },
      DEFAULT: { bg: "", hover: "" },
    };

    const { bg, hover } = channelColors[channel];

    return {
      item_table_row: `${bg}${hover}`,
    }
  }

  return (
    <ExportLayout>
      <DataTable
        filterBy={['Pedido', 'Descrição.Export']}
        filterByDate={['Dt.Registro','Dt.Atracação','Entrega','GR Atual']}
        isLoading={isLoading}
        columns={columns}
        data={data || []}
        aditionalStyles={setChannelStyle}
      />
    </ExportLayout>
  );
};
