export interface IImportFromTo{
  id?: number;
  import_type_id?: number;
  worksheet_column?: string;
  db_column_name_id?: number;
  required?: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}