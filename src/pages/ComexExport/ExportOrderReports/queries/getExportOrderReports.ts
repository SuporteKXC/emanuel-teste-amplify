import { apiComexExport } from "@/services";
import { useQuery } from "@tanstack/react-query";

async function getExportOrderReports() {
  const { data } = await apiComexExport.get("/scheduled-reports");

  return data;
}

export function useGetExportOrderReports() {
  return useQuery({
    queryKey: ["LIST-EXPORT-ORDER-REPORTS"],
    queryFn: getExportOrderReports,
    refetchInterval: 1000 * 60 /**  1min  */,
    refetchIntervalInBackground: true,
  });
}
