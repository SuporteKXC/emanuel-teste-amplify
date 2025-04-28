import { OptionTypeBase } from "react-select";

export interface IBusinessUnitOptions extends OptionTypeBase {}

export interface BusinessUnit {
  id: number;
  name: string;
}
