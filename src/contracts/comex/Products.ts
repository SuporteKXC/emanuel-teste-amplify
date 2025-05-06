import { ResponsibleData, Pagination, OrderItemData } from "contracts"

export interface ProductData {
  id: number;
  code: string;
  description: string;
  alert_critical: 0 | 1;
  consignee?: string;
  order_itens?: OrderItemData[];
  product_responsible?: ProductResponsibleData[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ProductDataPaginate {
  data: ProductData[] | [];
  meta: Pagination;
}

export interface ProductResponsibleData {
  product_id: number;
  responsible_id: number;
  responsible?: ResponsibleData;
  company_id?: number;
}