import { OptionTypeBase } from "react-select";
export interface ProduckRiskOption extends OptionTypeBase {
  classes: number;
}
export interface ProductRisk {
  id: number;
  name: string;
  classes: number;
}
