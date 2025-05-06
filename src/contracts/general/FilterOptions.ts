export interface IFilters {
  id: number;
  description: string;
  slug: string;
  is_shoow: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
