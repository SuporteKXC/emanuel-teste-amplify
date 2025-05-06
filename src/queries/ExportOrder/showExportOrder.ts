import { apiComexExport, apiStocks } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";


async function showExportOrders(id: string) {
  const { data } = await apiComexExport.get(`/export-order/${id}`);
  return data;
}

export default function useShowExportOrders(id: string) {
  return useQuery({
    queryKey: ["show-export-orders"],
    queryFn: () => showExportOrders(id),
  });
}
