import { apiComexExport, apiStocks } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";


async function showExportOrderItem(id: string) {
  const { data } = await apiComexExport.get(`/export-order-item/${id}`);
  return data;
}

export default function useShowExportOrderItem(id: string) {
  return useQuery({
    queryKey: ["show-export-order-item"],
    queryFn: () => showExportOrderItem(id),
  });
}
