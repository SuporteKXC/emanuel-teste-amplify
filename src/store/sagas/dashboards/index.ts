import { takeLatest } from "redux-saga/effects";
import { DashboardsListTypes } from "@/store/ducks/dashboard/listDashboards";
import { listDashboardsRequest } from "./listDashboards";

export const dashboardsSagas = [
  takeLatest(DashboardsListTypes.REQUEST, listDashboardsRequest),
]