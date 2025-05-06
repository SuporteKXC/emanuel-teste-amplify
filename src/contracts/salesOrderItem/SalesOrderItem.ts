import { SalesOrder } from "../salesOrder/salesOrder";

export interface SalesOrderItem {
  id: number;
  sales_order_id: number;
  product_id: number;
  item: number;
  qty: string;
  product?: any;
  sales_order?: SalesOrder;
}

export interface Company {
  id: number
  nameFantasy: string
  plantCode: string
}

export interface Client {
  id: number
  tradeName: string
}

export interface Carrier {
  id: number
  tradeName: string
}