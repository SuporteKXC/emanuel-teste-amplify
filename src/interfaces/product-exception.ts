import {ProductType} from './product-type';

export interface IProductException {
  id: number | null,
  product_type_id: number | null,
  product_exception_id: number | null,
  type: ProductType,
  exception: ProductType

}

export interface ProductException {
  id: number | null,
  product_type_id: number | null,
  product_exception_id: number | null,
  type: ProductType,
  exception: ProductType
}

