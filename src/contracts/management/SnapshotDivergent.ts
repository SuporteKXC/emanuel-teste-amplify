export interface SnapshotDivergentListQuery {
  limit: number | undefined;
  page: number;

  company_id: string | null;
  product_id: string | null;
  batch: string | null;
  justification_id: string | null;
  date: string | null;
}

export interface SnapshotDivergentListData {
  id: number;
  productId: number;
  productDescription: string;
  productCode: string;
  totalCompanyQty: number;
  totalCompanyValue: number;
  totalCompanyBlockedQty: number;
  totalCompanyBlockedValue: number;
  totalWarehouseQty: number;
  totalWarehouseValue: number;
  totalWarehouseBlockedQty: number;
  totalDiffQty: string;
  totalDiffValue: string;
  totalDiffBlockedQty: string;
  totlaDiffBlockedValue: string;
  snapshotDivergent: SnapshotDivergent[];
}

export interface SnapshotDivergentExportData
  extends SnapshotDivergentListData {}

export interface SnapshotDivergentExportQuery
  extends SnapshotDivergentListQuery {
  asList?: boolean;
}

export interface SnapshotDivergent {
  id: number;
  snapshot_date: string;
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
  warehouse_blocked_value: string;
  warehouse_total_qty: string;
  warehouse_total_value: string;
  diff_qty: string;
  diff_value: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  batch: string;
  company_id: number;
  product_id: number;
  name_fantasy: string;
  cnpj: string;
  consignee: any;
  plant_code: string;
  cost_center?: string;
  account_id: number;
  country?: string;
  description: string;
  code: string;
  alert_critical: number;
  snapshot_divergent_id: number | null;
  justification_snapshot_type_id: number | null;
  comment: string | null;
  name: string | null;
  justification: Justification[] | null[];
}

export interface Justification {
  snapshot_divergent_id: number;
  justification_snapshot_type_id: number;
  comment: string;
  name?: string;
  userId?: number;
  userName?: string;
  userEmail?: string;
  justifiedAt?: string;
}