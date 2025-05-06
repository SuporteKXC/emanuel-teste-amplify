import { ComboboxContentProps } from "@/components/ui/Forms";
import { DeliveryVoucher } from "@/contracts/trackingDelivery";

export const extractCarriers = (
  data: DeliveryVoucher[]
): ComboboxContentProps[] => {
  const carriers: ComboboxContentProps[] = [];

  data.forEach((item) => {
    if (!item.document.carrier) {
      return;
    }
    const carrier = carriers.find(
      (carrier) => carrier.value === `${item.document.carrier.id}`
    );

    if (!carrier) {
      carriers.push({
        name: item.document.carrier.tradeName,
        value: `${item.document.carrier.id}`,
      });
    }
  });

  return carriers;
};

export const extractClients = (
  data: DeliveryVoucher[]
): ComboboxContentProps[] => {
  const clients: ComboboxContentProps[] = [];

  data.forEach((item) => {
    if (!item.document.client) {
      return;
    }
    const client = clients.find(
      (client) => client.value === `${item.document.client.id}`
    );

    if (!client) {
      clients.push({
        name: item.document.client.tradeName,
        value: `${item.document.client.id}`,
      });
    }
  });

  return clients;
};
