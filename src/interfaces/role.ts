import { OptionTypeBase } from "react-select";

export interface IRole {
  id: number;
  general_module_id: number;
  name: string;
}

export interface IRoleOptions extends OptionTypeBase {}
