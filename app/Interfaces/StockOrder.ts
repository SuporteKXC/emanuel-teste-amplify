import { DateTime } from 'luxon';

export interface IStockOrder {
  id: number;
  order_reference: string;
  invoice_number: string;
  order_id: number;
  sap_import_date: DateTime;
  created_at: DateTime;
  updated_at: DateTime;
}