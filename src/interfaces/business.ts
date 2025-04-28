export interface Business {
  id: number;
  general_business_line_unit_id: number;
  unit: {
    name: string;
  };
  activity_division: string;
  description: string;
}
