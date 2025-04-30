export interface Iorder {
  id?: number;
  order_reference: string;
  responsible_po?: string;
  csr_name?: string;
  product_id: number;
  company_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export interface IorderCreateManyReturn {
  orderCreatedArrayObj: Iorder[];
  orderArrayCreateFailCompany: Pick<Iorder, "order_reference">[];
  orderArrayCreateFailProduct: Pick<Iorder, "order_reference">[];
}