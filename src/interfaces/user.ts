import { IRole } from "./role";
import { Company } from "./company";
import { Carrier } from "./carrier";
import { Business } from "./business";

type ROLE_ADMINISTRADOR = 1;
type ROLE_TRANSPORTADORA = 2;
type ROLE_GESTOR = 3;
export interface User {
  id: number;
  name: string;
  email: string;
  last_access: string;
  expiration_days: number;
  access_expires_at: string;
  roles: IRole[];
  companies?: Company[] | null;
  carrier?: Carrier[] | null;
  bussinessLines?: Business[] | null;
  root?: boolean;
}

export type UserRoles =
  | ROLE_ADMINISTRADOR
  | ROLE_TRANSPORTADORA
  | ROLE_GESTOR
  | null;
