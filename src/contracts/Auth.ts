import type { CompanyDocumentType } from './Common';

export type UserType = 'admin' | 'companyMember' | 'warehouseMember';

export interface Company {
  id: number;
  documentType: CompanyDocumentType;
  tradeName: string;
  document: string;
}

export interface Warehouse extends Company {}

export interface AuthData {
  profile: {
    userId: number;
    type: UserType;
    email: string;
    name: string;
    company?: Company;
    warehouses?: Warehouse[];
    root?: boolean;
  };
  token: string;
}
