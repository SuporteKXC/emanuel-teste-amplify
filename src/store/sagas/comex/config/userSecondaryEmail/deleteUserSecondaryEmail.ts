import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  UserSecondaryEmailDeleteActions,
  UserSecondaryEmailDeleteRequestAction,
} from "store/ducks";

export function* userSecondaryEmailDeleteRequest(action: any) {
  const { id, onSuccess, onFailure }: UserSecondaryEmailDeleteRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/user-secondary-email/delete/${id}`);
    onSuccess && onSuccess();
    notify("success", "Email secundário deletado!");
    yield all([put(UserSecondaryEmailDeleteActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(UserSecondaryEmailDeleteActions.failure(errorMessage));
  }
}
