import { DashboardsActions, DashboardsRequestAction } from "@/store/ducks/dashboard/listDashboards";
import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, applyQueryString, api } from "services";

export function* listDashboardsRequest(action: any) {
  const { query, onSuccess, onFailure }: DashboardsRequestAction = action;

  try {
    const url = applyQueryString("dashboards/index", {
      ...query,
    });

    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([put(DashboardsActions.success(data, data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(DashboardsActions.failure(errorMessage));
  }
}
