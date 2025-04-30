import { IImportFromTo } from "app/Interfaces/ImportFromTo";
import ImportType from "App/Models/ImportType";

export interface IImportType{
  id?: number;
  name?: string;
  group_slug?: string;
  identifier?: string;
  company_id?: number;
  storage_location_id?: number;
  skip_rows?: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  import_from_to?: IImportFromTo[];
  import_date?: Date;
}

export interface IImportTypeRequired extends ImportType {
  arrayRequired?: Record<string, string>;
}

export interface IdataAttachments{
  filename: string;
  data: Buffer;
}

export interface IreadFileDeParam{
  name: string;
  importType: any;
  body: any[];
}