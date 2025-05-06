import { ICreditHistory } from "contracts";

export interface IServiceType {
  id?: number;
  description?: number;
  details?: number;
  service_value?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  credit_histories?: ICreditHistory[];
}