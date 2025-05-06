import { ISnapshotFilter } from "store/ducks/management";

export interface SnapshotListQuery {
  snapshotDate: string;
  companyId?: number;
  productId?: number;
  batch?: string;
  page?: number;
  limit?: number;
}

export interface SnapshotListData {
  productCode: string;
  productId: number;
  productName: string;
  totalCompanyQty: string;
  totalCompanyValue: string;
  totalCompanyBlockedQty: string;
  totalCompanyBlockedValue: string;
  totalWarehouseQty: string;
  totalWarehouseValue: string;
  totalWarehouseBlockedQty: string;
  totalDiffQty: string;
  totalDiffValue: string;
  totalDiffBlockedQty: string;
  totlaDiffBlockedValue: string;
  snapshot: Snapshot[];
}

export interface SnapshotExportData extends SnapshotListData {}
export interface SnapshotExportQuery extends ISnapshotFilter {}

export interface Snapshot {
  id: number;
  snapshot_date: any;
  stock_element_id: number;
  company_qty: string;
  company_value: string;
  company_blocked_qty: string;
  company_blocked_value: string;
  company_quality_insp_qty: string;
  company_quality_insp_value: string;
  company_restricted_qty: string;
  company_restricted_value: string;
  company_total_qty: string;
  company_total_value: string;
  company_total_blocked_qty: string;
  company_total_blocked_value: string;
  warehouse_qty: string;
  warehouse_value: string;
  warehouse_blocked_qty: string;
  warehouse_blocked_value:string;
  warehouse_total_qty: string;
  warehouse_total_value: string;
  status: any;
  diff_qty: string;
  diff_value: string;
  created_at: any;
  updated_at: any;
  batch: string;
  company_id: number;
  product_id: number;
  deleted_at: any;
  name_fantasy: string;
  cnpj: string;
  consignee: any;
  plant_code: string;
  cost_center: string;
  account_id: 1;
  country: string;
  description: string;
  code: string;
  alert_critical: boolean;
}

export interface StockElement {
  id: number;
  batch: string;
  companyId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  product: Product;
  company: MCompany;
}

export interface Product {
  id: number;
  description: string;
  code: string;
  consignee: any;
  alertCritical: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface MCompany {
  id: number;
  nameFantasy: string;
  cnpj: string;
  consignee: string;
  plantCode: string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  country: string;
}
