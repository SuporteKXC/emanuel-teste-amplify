import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

async function processReport() {
  const { data } = await api.post(`scheduled-reports/process`);
  return data;
}

export function useProcessReport() {
  return useMutation({
    mutationFn: processReport,
  });
}
