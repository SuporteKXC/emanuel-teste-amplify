import { OptionTypeBase } from "react-select";
import { ClientType } from "./client-type";

export interface IClientOption extends OptionTypeBase {}

export interface Client {
  id: number;
  client_code: number;
  cnpj: string;
  company_name: string;
  trade_name: string;
  phone_number?: string;
  inscricao_estadual?: string | null;
  email?: string | null;
  address_street?: string | null;
  address_number?: string | null;
  address_neighborhood?: string | null;
  address_zipcode?: string | null;
  address_id_city_ibge?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_latitude?: string | null;
  address_longitude?: string | null;
  clientType: ClientType | null;
  id_exterior?: string | null;
}
