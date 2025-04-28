import { OptionTypeBase } from "react-select";
import { Company } from "./company";
import { VehicleType } from "./vehicle-type";

export interface VehicleOption extends OptionTypeBase {
  duration: number;
}

export interface Vehicle {
  id: number;
  scheduling_vehicle_type_id: number;
  general_company_id: number;
  duration: number;
  weight: number;
  pallet: number;
  distance_between_delivery: number;
  max_distance: number;
  max_delivery: number;
  blocked_at: string | null;
  vehicleType: VehicleType;
  company: Company;
}
