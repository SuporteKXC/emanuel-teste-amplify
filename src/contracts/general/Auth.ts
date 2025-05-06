import { Company } from "../comex";

export type UserType = "admin";
export interface AuthData {
  profile: IProfile;
  token: string;
}

interface UserCompany {
  id: number
  user_id: number
  company_id: number
  created_at: string
  deleted_at: string | null
  company: Company
}

export interface IProfile {
  userId: number;
  email: string;
  name: string;
  type: UserType;
  first_access: boolean;
  image_key: string;
  user_roles: {
    role: {
      name: string;
    }
  }[],
  user_company: UserCompany[]
  countries: any[]
}

export type IPermissionData = string[];
