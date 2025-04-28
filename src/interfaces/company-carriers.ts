import { Carrier } from "./carrier";
import { Company } from "./company";

export interface CompanyCarrier {
  id: number;
  company_id: number;
  carrier_id: number;
  company: Company;
  carrier: Carrier;
}