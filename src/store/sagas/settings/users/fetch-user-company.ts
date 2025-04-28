import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { FetchUserCompanyActions } from "store/ducks/settings/users";

export function* fetchUserCompanyRequest(action: any) {
  try {
    const { id, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/user-companies/${id}`);
    yield put(FetchUserCompanyActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchUserCompanyActions.failure(errorMessage));
  }
}
