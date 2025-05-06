import { apiComexExport } from "@/services";
import { useMutation } from "@tanstack/react-query";

type GenerateReportParamsType = {
  type: string;
} & Record<string, any>;

async function generateReport(payload: GenerateReportParamsType) {
  const { data } = await apiComexExport.post("/scheduled-reports/generate", payload);

  return data;
}

export function useGenerateReport() {
  return useMutation({
    mutationKey: ["GENERATE-REPORT"],
    mutationFn: generateReport,
  });
}
