import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchBusinessUnitActions } from "store/ducks/settings/business-unit";

export function* fetchBusinessUnitRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/business-units/${id}`);

    yield put(FetchBusinessUnitActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchBusinessUnitActions.failure(errorMessage));
  }
}
