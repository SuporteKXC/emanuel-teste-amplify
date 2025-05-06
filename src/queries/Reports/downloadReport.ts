import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

type DownloadReportResponseType = {
  base64: string;
  ext: string;
  fileName: string;
  uri: string;
};

async function downloadReport(reportId: number) {
  const { data } = await api.get<DownloadReportResponseType>(
    `/scheduled-reports/${reportId}`
  );
  return data;
}

export function useDownloadReport() {
  return useMutation({
    mutationFn: downloadReport,
  });
}
