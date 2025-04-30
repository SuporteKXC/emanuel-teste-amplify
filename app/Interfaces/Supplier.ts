export interface Isupplier{
  id?: number;
  code: string;
  description?: string;
  country?: string;
  is_special: boolean;
  is_ignore_comex: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}