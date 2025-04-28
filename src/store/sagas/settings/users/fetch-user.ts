import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchUserActions } from "store/ducks/settings/users";

export function* fetchUserRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/users/${id}`);

    yield put(FetchUserActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchUserActions.failure(errorMessage));
  }
}
