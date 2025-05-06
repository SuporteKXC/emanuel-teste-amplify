import { CompanyDocumentType, WithAddress } from './Common';

export interface Company extends WithAddress {
  id: number;
  tradeName: string;
  documentType: CompanyDocumentType;
  document: string;
  addressStreet: string;
  addressNumber: string;
  addressComplement: string;
  addressNeighborhood: string
  addressCity: string
  addressState: string
  addressZipcode: string
  addressCountry: string
  addressLatitude: string | null
  addressLongitude: string | null
  ibge: string | null
  email?: string
  companyFile: any
}

export interface PaginatedCompany
  extends Pick<
    Company,
    | 'id'
    | 'tradeName'
    | 'documentType'
    | 'document'
    | 'addressCity'
    | 'addressState'
  > {}

export interface ListedCompany
  extends Pick<Company, 'id' | 'tradeName' | 'documentType' | 'document'> {}
