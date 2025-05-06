import { Company } from './Companies';
import { Product } from './Products';
import { ProductUnit } from './ProductUnits';
import { Warehouse } from './Warehouses';

export interface Stock {
  id: number;
  warehouseId: number;
  companyId: number;
  productId: number;
  productUnitId: number;
  quantity: number;
  batch: string;
  price: number;
  invoiceNumber: string;
  manufacturingDate: string | null;
  expirationDate: string | null;
  entranceDate: string | null;
  warehouse: Warehouse;
  company: Company;
  product: Product;
  productUnit: ProductUnit;
  updatedAt: string;
  time: number;
  totalPrice: number;
  startDate: string;
  dueDate: string;
}

export interface PaginatedStock
  extends Pick<
    Stock,
    | 'id'
    | 'quantity'
    | 'batch'
    | 'price'
    | 'invoiceNumber'
    | 'manufacturingDate'
    | 'expirationDate'
    | 'entranceDate'
    | 'warehouse'
    | 'company'
    | 'product'
    | 'productUnit'
    | 'updatedAt'
    | 'time'
    | 'startDate'
    | 'dueDate'
    | 'totalPrice'
  > {}

export interface ListedStock extends PaginatedStock {}
