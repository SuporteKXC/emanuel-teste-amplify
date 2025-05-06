import type { Company } from './Companies';
import type { Product } from './Products';
import type { ProductUnit } from './ProductUnits';
import type { Stock } from './Stocks';
import type { Warehouse } from './Warehouses';

export interface ListedStockRelatedCompany extends Company {}

export interface ListedStockRelatedWarehouse
  extends Pick<Warehouse, 'id' | 'tradeName' | 'documentType' | 'document'> {}

export interface AvailableStock extends Pick<Stock, 'id' | 'batch'> {
  product: Pick<Product, 'id' | 'name' | 'code' | 'factor' | 'contractType'>;
  productUnit: Pick<ProductUnit, 'id' | 'name'>;
  /**
   * This value reflects the Stock quantity field
   * minus the sum of each StockOrderItem quantity field not yet
   * finished or canceled
   * */
  availableQuantity: number;
}

export interface ListedAvailableStock extends AvailableStock {}
