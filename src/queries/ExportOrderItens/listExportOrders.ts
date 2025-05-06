import { apiComexExport, apiStocks } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";


async function listExportOrderItens() {
  const { data } = await apiComexExport.get("/export-order-item/");
  return data;
}

export default function useListExportOrderItens() {
  return useQuery({
    queryKey: ["list-export-order-item"],
    queryFn: listExportOrderItens,
  });
}
