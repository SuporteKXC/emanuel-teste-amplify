import type { Company } from './Companies';
import type { User } from './Users';

export interface CompanyMember {
  id: number;
  userId: number;
  user: User;
  companyId: number;
  company: Company;
}

export interface PaginatedCompanyMember extends CompanyMember {}
