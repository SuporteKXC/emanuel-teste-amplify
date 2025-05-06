import { IShipmentTracking } from "@/contracts";
import { apiComexExport } from "@/services";
import { useMutation } from "@tanstack/react-query";

async function getShipmentTracking(
  id: string | number
): Promise<IShipmentTracking> {
  const { data } = await apiComexExport.get(
    `/export-order-item/container-tracking/${id}`
  );

  return data;
}

export function useGetShipmentTracking() {
  return useMutation({
    mutationFn: getShipmentTracking,
  });
}
