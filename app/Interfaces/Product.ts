export interface Iproduct{
  id?: number;
  description?: string;
  code?: string;
  origem?: string;
  business_unit?: string;
  bu?: string;
  consignee?: string;
  alert_critical?: boolean;
  ignored_stock?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}