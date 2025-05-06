import { DateTime } from "luxon";
import { Company, ProductData } from "../comex";
import { Carrier, Client } from "../general";
import { Document } from "../trackingDelivery";
import { TimelineTypeData } from "../comex/Timeline";

export interface ExportOrder {
  id: number;
  [key: string]: any;
  order_reference: string;
  company_id?: number | null;
  company: Company;
  items: { qty: any; item: any; product: ProductData; [key: string]: any }[];
}

export interface ExportOrderItem {
  id: number;
  item: number;
  [key: string]: any;
  qty: number;
  un: string;
  export_order_id: number;
  product_id: number;
  created_at: DateTime;
  updated_at: DateTime;
  deleted_at: DateTime;
  net_price: number;
  price_unit: number;
  product: {
    id: number;
    code: string;
    description: string;
  };
  emission_date: DateTime; // or string if you handle dates as ISO strings
  deadline_date: DateTime;
  delivery_date: DateTime;
  delivery_document_number: string;
  status: string;
  route: string;

  client_id?: number | null;
  client: Client;
  document_id?: number;
  document: Document;
  carrier_id?: number;
  carrier: Carrier;
  purchasing_doc_type?: string | null;
  statistical_delivery_date?: DateTime | null;
  purchasing_info?: string | null;
  tax_code?: string | null;
  tax_jurisdiction?: string | null;
  supplying_plant?: string | null;
  timeline_type_id: number;
  timeline_type: TimelineTypeData;
  exportOrder: Omit<ExportOrder, "items">;
}
