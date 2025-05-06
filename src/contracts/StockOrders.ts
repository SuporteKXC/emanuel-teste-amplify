import { WithAddress } from './Common';
import { Company } from './Companies';
import { Product } from './Products';
import { ProductUnit } from './ProductUnits';
import { User } from './Users';
import { Warehouse } from './Warehouses';

export type StockOrderStatus =
  | 'pendente'
  | 'separacao'
  | 'contagem'
  | 'finalizado'
  | 'cancelado';

export interface StockOrderItem {
  id: number;
  stockOrderId: number;
  productId: number;
  productUnitId: number;
  batch: string;
  quantity: number;
  productUnit: ProductUnit;
  product: Product;
}

export interface StockOrder extends WithAddress {
  id: number;
  warehouseId: number;
  companyId: number;
  createdAt: string;
  shippingInvoiceNumber: string;
  salesInvoiceNumber: string;
  status: StockOrderStatus;
  wmsId: string | null;
  withdrawalDate: string | null;
  canceledAt: string | null;
  capturedAt: string | null;
  company: Company;
  warehouse: Warehouse;
  items: StockOrderItem[];
  ot?: string | null;
  user: Partial<Pick<User, 'id' | 'name' | 'email'>>;
}

export interface PaginatedStockOrder
  extends Pick<
    StockOrder,
    | 'id'
    | 'wmsId'
    | 'shippingInvoiceNumber'
    | 'salesInvoiceNumber'
    | 'company'
    | 'warehouse'
    | 'withdrawalDate'
    | 'addressCity'
    | 'addressState'
    | 'items'
    | 'status'
    | 'ot'
  > {}
