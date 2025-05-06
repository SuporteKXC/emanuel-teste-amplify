import { DateTime } from "luxon";

export interface DashboardData {
  id: number;
  description: string;
  locale: JSON;
  module_id: number;
  script: string;
  page_url: string;
  permissions: string;
  created_at: DateTime;
  updated_at: DateTime;
  deleted_at: DateTime | null;
}
