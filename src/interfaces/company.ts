import { OptionTypeBase } from "react-select";
export interface CompanyOption extends OptionTypeBase {}
export interface Company {
  id: number;
  type: string;
  code: number;
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
  scheduling_starts: number | null;
}

export enum SchedulingTimeType {
  "Mesmo dia" = 0,
  "24H" = 24,
  "48H" = 48,
  "72H" = 72,
}

export interface SchedulingTimes extends OptionTypeBase {}
