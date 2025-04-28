import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { FetchUserBusinessLineActions } from "store/ducks/settings/users";

export function* fetchUserBusinessLineRequest(action: any) {
  try {
    const { id, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/user-business-lines/${id}`);
    yield put(FetchUserBusinessLineActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchUserBusinessLineActions.failure(errorMessage));
  }
}
