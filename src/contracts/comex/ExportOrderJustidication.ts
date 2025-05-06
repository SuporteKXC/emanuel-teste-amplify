import { UserData, JustificationTypeData } from "contracts";


export interface ExportOrderJustificationData {
  id: number;
  description: string;
  justification_type_id: number;
  user_id: number;
  export_order_id: number;
  created_at: string;
  justification_type?: JustificationTypeData;
  user?: UserData;
}