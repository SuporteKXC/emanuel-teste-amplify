import { apiStocks } from "@/services";
import { useMutation } from "@tanstack/react-query";

type Input = {
  documentId: number;
  cancellationJustification: string;
};

async function cancelInvoice(payload: Input) {
  const { data } = await apiStocks.put("/documents/cancel-invoice", payload);
  return data;
}

export default function useCancelInvoice() {
  return useMutation({
    mutationKey: ["cancel-invoice"],
    mutationFn: cancelInvoice,
  });
}
