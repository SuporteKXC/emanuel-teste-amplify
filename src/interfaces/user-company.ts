import { Company } from "./company";
import { User } from "./user";


export interface UserCompany {
  id: number;
  user: User | null;
  companies: Company[];
}
