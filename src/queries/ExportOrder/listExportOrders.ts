import { apiComexExport, apiStocks } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";


async function listExportOrders() {
  const { data } = await apiComexExport.get("/export-order/");
  return data;
}

export default function useListExportOrders() {
  return useQuery({
    queryKey: ["list-export-order"],
    queryFn: listExportOrders,
  });
}
