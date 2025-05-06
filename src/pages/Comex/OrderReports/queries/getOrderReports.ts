import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

async function getOrderReports() {
  const { data } = await api.get("/scheduled-reports");

  return data;
}

export function useGetOrderReports() {
  return useQuery({
    queryKey: ["LIST-ORDER-REPORTS"],
    queryFn: getOrderReports,
    refetchInterval: 1000 * 60 /**  1min  */,
    refetchIntervalInBackground: true,
  });
}
