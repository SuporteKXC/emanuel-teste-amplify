import { RoleData, IAlertGroupData } from "contracts";

export interface AlertTypeData {
  id: number;
  module_id: number;
  description: string;
  details: string;
  alert_frequency: string;
  created_at: string;
  role_alert_type: {
    id: number;
    role: RoleData;
  }[];

  alerts_group: IAlertGroupData[];
}
