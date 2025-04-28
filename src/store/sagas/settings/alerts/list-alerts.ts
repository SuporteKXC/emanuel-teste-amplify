import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListAlertsActions } from "store/ducks/settings/alerts";

import { Alert } from "interfaces/alert";

export function* listAlertsRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/alerts?${queryString}`);
    const comboOptions = data.map((alert: Alert) => ({
      value: alert.id,
      label: `${alert.description || "---"}`,
    }));

    yield put(ListAlertsActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListAlertsActions.failure(errorMessage));
  }
}
