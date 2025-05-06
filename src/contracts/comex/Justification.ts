import { UserData, JustificationTypeData } from "contracts";


export interface JustificationData {
  id: number;
  description: string;
  justification_type_id: number;
  user_id: number;
  order_item_id: number;
  created_at: string;
  justification_type?: JustificationTypeData;
  user?: UserData;
}