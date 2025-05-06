import { AlertTypeData } from "./AlertType";

export interface IAlertGroupData{
    id: number;
    alert_type_id: number;
    alert_id_grouped: number;
    deleted_at: Date | null;
    alert_grouped?: AlertTypeData
}