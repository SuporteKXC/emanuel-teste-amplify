import { City } from "./AddressLookup";
import { Carrier } from "./Carrier";

export interface TrackingTransitTime {
  id: number;
  carrierId: number;
  carrierCnpj: string;
  type: string;
  ibgeOrigin: string;
  ibgeDestiny: string;
  weight: string;
  deadlineFractional: number;
  deadlineDedicated: number;
  start: number;
  countFractional: string;
  countDedicated: string;
  cutHour: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  cityOrigin: Pick<City, "ibge" | "name" | "state">;
  cityDestiny: Pick<City, "ibge" | "name" | "state">;
  carrier: Pick<Carrier, "id" | "tradeName">;
}
