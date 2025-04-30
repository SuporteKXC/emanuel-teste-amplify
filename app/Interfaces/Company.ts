export interface Icompany{
  id?: number;
  name_fantasy?: string;
  cnpj?: string;
  consignee?: string;
  plant_code?: string;
  cost_center?: string;
  account_id?: number;
  is_show_stock?: boolean;
  country?: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}