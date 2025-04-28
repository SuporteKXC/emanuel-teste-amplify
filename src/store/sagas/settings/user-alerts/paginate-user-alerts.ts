import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateUserAlertsActions } from "store/ducks/settings/user-alerts";

export function* paginateUserAlertsRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/user-alerts?${queryString}`
    );

    const { userAlerts, pagination } = responseBody;
    yield put(PaginateUserAlertsActions.success(userAlerts, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateUserAlertsActions.failure(errorMessage));
  }
}
