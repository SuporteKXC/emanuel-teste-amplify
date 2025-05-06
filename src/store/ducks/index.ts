export * from "./general";
export * from "./comex";

import { combineReducers } from "redux";
import { generalReducers } from "./general"
import { comexReducers } from "./comex";
import { managementReducers } from "./management";
import { trackingDeliveryReducers } from "./trackingDelivery";
import { dashboardReducers } from "./dashboard"
import { datatableFilterReducer } from "./export/dataTableFilters";

export default combineReducers({
  ...generalReducers,
  ...comexReducers,
  ...managementReducers,
  ...trackingDeliveryReducers,
  ...dashboardReducers,
  datatableFilterReducer
});
