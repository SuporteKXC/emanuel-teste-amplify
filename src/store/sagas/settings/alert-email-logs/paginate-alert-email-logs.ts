import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateAlertEmailLogsActions } from "store/ducks/settings/alert-email-logs";

export function* paginateAlertEmailLogsRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/alert-email-log?${queryString}`
    );

    const { alertsEmailLog, pagination } = responseBody;
    yield put(PaginateAlertEmailLogsActions.success(alertsEmailLog, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateAlertEmailLogsActions.failure(errorMessage));
  }
}
