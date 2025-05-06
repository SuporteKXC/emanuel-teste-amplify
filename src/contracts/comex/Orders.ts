import { ProductData, Company, OrderItemData } from "contracts";
import { OrderFile } from "./OrderFile";

export interface Order {
  id: number;
  order_reference: string;
  responsible_po: string;
  csr_name: string;
  product_id: number;
  company_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  order_files: OrderFile[];
  product: ProductData;
  order_itens: OrderItemData[];
  company: Company;
  totals: any;
}
