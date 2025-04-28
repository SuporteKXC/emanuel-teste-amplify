import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateAlertsActions } from "store/ducks/settings/alerts";

export function* paginateAlertsRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/alerts?${queryString}`
    );

    const { alerts, pagination } = responseBody;
    yield put(PaginateAlertsActions.success(alerts, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateAlertsActions.failure(errorMessage));
  }
}
