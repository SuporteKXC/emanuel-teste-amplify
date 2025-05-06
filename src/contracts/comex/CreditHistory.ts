import { IServiceType, UserData } from "contracts";

export interface ICreditHistory {
  id?: number;
  user_id?: number;
  service_type_id?: number;
  credit_charged?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  service_type?: IServiceType;
  user?: UserData;
}