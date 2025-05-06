import { CompanyDocumentType, WithAddress } from './Common';

export interface Warehouse extends WithAddress {
  id: number;
  tradeName: string;
  groupName: string | null;
  documentType: CompanyDocumentType;
  document: string;
}

export interface PaginatedWarehouse
  extends Pick<
    Warehouse,
    | 'id'
    | 'tradeName'
    | 'groupName'
    | 'documentType'
    | 'document'
    | 'addressCity'
    | 'addressState'
  > {}

export interface ListedWarehouse
  extends Pick<
    Warehouse,
    'id' | 'tradeName' | 'groupName' | 'documentType' | 'document'
  > {}
