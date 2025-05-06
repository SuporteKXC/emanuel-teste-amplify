import { OrderItemAlertData, IAction } from "contracts";

export interface UserData {
  name: string;
  email: string;
  id: number;
  image_key: string;
  created_at: string;
  last_access?: string;
  code_sap: string
}

export interface RoleData {
  id: number;
  name: string;
  created_at: string;
  role_action: {
    action: IAction;
  }[];
}

export interface CompanyData {
  id: number;
  name_fantasy: string;
  cnpj: number;
  consignee: string;
  user_company: UserData[];
}

export interface UserAlertData {
  id: number;
  message: string;
  read: number;
  user_id: number;
  order_item_alert_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  user: UserData;
  order_item_alert: OrderItemAlertData;
}

export interface UserAlertPaginate {
  data:{
    data: UserAlertData[],
    meta: any
  }
}
