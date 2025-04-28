export interface IProductCompany {
  id: number;
  code: number | null;
  description: string | null;
  business_line_id: number | null;
}

export interface ProductCompany {
  id: number;
  product: {
    id: number;
    code: number | null;
    description: string | null;
    business_line_id: number | null;
  };
  company: {
    id: number;
    code: number;
  };
  business_line: {
    id: number | null;
    activity_division: string;
    description: string;
  };
}
