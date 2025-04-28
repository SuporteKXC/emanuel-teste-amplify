import { OptionTypeBase } from "react-select";

export interface IGroup {
  id: number;
  general_module_id: number;
  name: string;
}

export interface IGroupOptions extends OptionTypeBase {}
