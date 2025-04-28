import { OptionTypeBase } from "react-select";

export interface ICarrierOptions extends OptionTypeBase {}

export interface Carrier {
  id: number;
  carrier_code: number | null;
  cnpj: string;
  cnpj_root: string;
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
}
