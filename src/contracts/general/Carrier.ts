import { CarrierDocumentType } from "./Common";

export interface Carrier {
  id: number;
  tradeName: string;
  documentType: CarrierDocumentType;
  documentNumber: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressStateCode: string;
  addressCountry: string;
  addressZipcode: string;
  addressIbgeCode: string;
  addressLatitude: string;
  addressLongitude: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  carrierCodeSaps: CarrierSapCodeResponse | null;
}

export type CarrierCodeSap = {
  id?: number;
  addressZipcode: string;
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressState: string;
  addressCity: string;
  codeSap: string;
};

export interface CarrierSapCodeResponse {
  id: number;
  codeSap: string;
  addressZipcode: string;
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressState: string;
  addressCity: string;
  carrierId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
