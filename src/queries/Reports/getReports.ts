import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

type ReportType =
  | "order-item"
  | "export-order-item"
  | "delivery-voucher"
  | (string & {});

async function getReports(type?: ReportType) {
  const qs = type ? `?type=${type}` : "";

  const { data } = await api.get(`/scheduled-reports${qs}`);

  return data;
}

export function useGetReports(type?: ReportType) {
  return useQuery({
    queryKey: ["LIST-ORDER-REPORTS", type],
    queryFn: ({ queryKey }) => getReports(queryKey[1]),
    refetchInterval: 1000 * 60 /**  1min  */,
    refetchIntervalInBackground: true,
  });
}
