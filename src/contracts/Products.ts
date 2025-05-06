export interface Product {
  id: number;
  code: string;
  name: string;
  factor?: number;
  contract?: string;
  contractDescription?: string;
  contractType?: string;
}
