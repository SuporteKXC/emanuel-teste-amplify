export interface TimelineTypeData {
  id: number;
  description: string;
  company_id: number;
  product_id: number;
  modal: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  timelines: Timeline[];
}

export interface Timeline {
  id: number;
  description: string;
  code: string;
  field: string;
  aux_field: string;
  step: number;
  timeline_type_id: number;
  additional_info: string | null;
  max_delay: number;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
