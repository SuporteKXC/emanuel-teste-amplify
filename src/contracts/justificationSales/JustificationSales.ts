import { DateTime } from "luxon";

export interface JustificationSales {
  id: number;
  description: string;
  justification_type_id: number;
  user_id: number;
  created_at: DateTime;
  sales_order_id: number;
}