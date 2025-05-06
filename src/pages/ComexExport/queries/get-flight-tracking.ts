import { IFlightTracking } from "@/contracts";
import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

async function getFlightTracking(
  id: string | number
): Promise<IFlightTracking> {
  const { data } = await api.get(`/export-order-item/flight/tracking/${id}`);

  return data;
}

export function useGetFlightTracking() {
  return useMutation({
    mutationFn: getFlightTracking,
  });
}
