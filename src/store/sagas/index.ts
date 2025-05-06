import { all } from "redux-saga/effects";
import { generalSagas } from "./general";
import { comexSagas } from './comex';
import { managementSagas } from "./management";
import { trackingDeliverySagas } from "./trackingDelivery";
import { dashboardsSagas } from "./dashboards";

export default function* rootSaga() {
  yield all([
    ...generalSagas,
    ...comexSagas,
    ...managementSagas,
    ...trackingDeliverySagas,
    ...dashboardsSagas,
  ]);
}
