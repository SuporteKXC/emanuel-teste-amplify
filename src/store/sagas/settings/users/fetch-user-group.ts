import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { FetchUserGroupActions } from "store/ducks/settings/users";

export function* fetchUserGroupRequest(action: any) {
  try {
    const { id, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/user-groups/${id}`);
    yield put(FetchUserGroupActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchUserGroupActions.failure(errorMessage));
  }
}
