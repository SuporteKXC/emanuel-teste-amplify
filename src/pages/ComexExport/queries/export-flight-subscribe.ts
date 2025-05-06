import { apiComexExport } from "@/services";
import { useMutation } from "@tanstack/react-query";

export enum ModalSubscription {
  flight = "pausado",
  aerea = "AEREA",
}

export type ExportSubscriptionType = {
  id: string | number;
  modal: ModalSubscription;
};

async function exportSubscribe(props: ExportSubscriptionType) {
  const { id, modal } = props;

  const { data } = await apiComexExport.get(
    `/export-order-item/start-container-tracking/${id}`
  );

  return data;
}

export function useExportSubscribe() {
  return useMutation({
    mutationFn: exportSubscribe,
  });
}
