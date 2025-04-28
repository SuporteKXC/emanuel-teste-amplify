import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchBusinessActions } from "store/ducks/settings/business";

export function* fetchBusinessRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/business/${id}`);

    yield put(FetchBusinessActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchBusinessActions.failure(errorMessage));
  }
}
