import { Company } from "./Company";
import { Complaint, StockMovementsSnapshot } from "./Import";
import { Product } from "./Product";
import { StockElement } from "./Snapshot";


export type TransferComplaint = Complaint & {
  created_at: any
}

export type StockTransferSnapshot = StockMovementsSnapshot & {
  movementType: string
  complaint: TransferComplaint[]

}


export interface TransferStockElement extends StockElement {
  stockTransferSnapshot: StockTransferSnapshot[]
}


export interface TransferListData extends Product {
  stockElement: TransferStockElement[]
}

export interface TransfersQuery {
  snapshotDate: string;
  companyId?: number;
  productId?: number;
  batch?: string;
  page?: number;
  limit?: number;
}