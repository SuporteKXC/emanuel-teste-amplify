import { Document } from '@/contracts/trackingDelivery/Document';

export function extractCarriers(data: Document[]) {
  const carriersMap = new Map();

  data.forEach(item => {
      const key = item.carrier.id;
      if (key && !carriersMap.has(key)) {
          if(item.carrier.tradeName)
            carriersMap.set(key, { name: item.carrier.tradeName.toUpperCase(), value: key });
      }

  });

  const sortedCarriers = Array.from(carriersMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return Array.from(sortedCarriers);
}

export function extractClients(data: Document[]) {
  const clientsMap = new Map();

  data.forEach(item => {
      const key = item.client.id;
      if (key && !clientsMap.has(key)) {
          if(item.client.tradeName)
            clientsMap.set(key, { name: item.client.tradeName.toUpperCase(), value: key });
      }
  });

  const sortedClients = Array.from(clientsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return Array.from(sortedClients.values());
}

export function extractOrigins(data: Document[]) {
  const originsMap = new Map();

  data.forEach(item => {
      const origin = `${item.originCity}, ${item.originState}`.toUpperCase();;

      // Adiciona origem se não existir
      if (!originsMap.has(origin)) {
          originsMap.set(origin, { name: origin, value: origin });
      }
  });

  const sortedOrigins = Array.from(originsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return Array.from(sortedOrigins.values());
}

export function extractDestinations(data: Document[]) {
  const destinationsMap = new Map();

  data.forEach(item => {
      const destination = `${item.destinationCity}, ${item.destinationState}`.toUpperCase();

      // Adiciona origem se não existir
      if (!destinationsMap.has(destination)) {
          destinationsMap.set(destination, { name: destination, value: destination });
      }
  });

  const sortedDestinations = Array.from(destinationsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return Array.from(sortedDestinations.values());
}