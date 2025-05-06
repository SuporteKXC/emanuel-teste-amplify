export interface SupplierData {
  id: number;
  code: string;
  description: string;
  country: string | null;
  is_special: boolean;
  is_ignore_comex: boolean;
  responsible_analists?: {name: string, id: number}[]
  created_at: string;
  updated_at: string; 
  deleted_at: string | null;
}
