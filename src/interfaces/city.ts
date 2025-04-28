import { OptionTypeBase } from "react-select";

export interface ICity {
  name: string;
  ibge: string;
  state: string;
  id: number;
}

export interface ICitiesOptions extends OptionTypeBase {
  ibge: string;
}
