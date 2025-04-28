import { Business } from './business';

export interface IProduct {
  id: number;
  code: number | null;
  description: string | null;
  business_line_id: number | null;
  product_type_id: number | null;
  pallet_quantity: number | null;
}
export interface Product {
  id: number;
  code: number | null;
  description: string | null;
  business_line_id: number | null;
  product_type_id: number | null;
  pallet_quantity: number | null;
  business_line?: Business;
}
