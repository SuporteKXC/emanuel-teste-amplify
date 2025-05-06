import { ClientDocumentType } from "./Common";
import { Carrier } from "./Carrier";

interface Options {
  id: string;
  value: string;
  label?: string;
}

export type TCodeSap = {
  id?: number;
  addressZipcode: string;
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressState: string;
  addressCity: string;
  codeSap: string;
};

export type TCodeSapResponse = {
  id: number;
  code_sap: string;
  address_zipcode: string;
  address_street: string;
  address_number: string;
  address_neighborhood: string;
  address_state: string;
  address_city: string;
  client_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
};

export interface Client extends Carrier {
  sunday: Boolean;
  monday: Boolean;
  tuesday: Boolean;
  wednesday: Boolean;
  thursday: Boolean;
  friday: Boolean;
  saturday: Boolean;
  days?: Options[];
  clientCodeSaps: TCodeSapResponse[] | null;
}
