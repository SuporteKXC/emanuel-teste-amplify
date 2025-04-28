import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { FetchUserSecondaryEmailActions } from "store/ducks/settings/users";

export function* fetchUserSecondaryEmailRequest(action: any) {
  try {
    const { query, onSuccess } = action as IListRequest;
    const { data } = yield call(apiGeneral.get, `/user-email-secondary/${query}`);
    yield put(FetchUserSecondaryEmailActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchUserSecondaryEmailActions.failure(errorMessage));
  }
}
