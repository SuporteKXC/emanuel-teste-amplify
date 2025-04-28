import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchAlertEmailLogActions } from "store/ducks/settings/alert-email-logs";

export function* fetchAlertEmailLogRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/alert-email-log/${id}`);

    yield put(FetchAlertEmailLogActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchAlertEmailLogActions.failure(errorMessage));
  }
}
