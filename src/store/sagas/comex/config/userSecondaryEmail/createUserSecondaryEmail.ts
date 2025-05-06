import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  UserSecondaryEmailActions,
  UserSecondaryEmailRequestAction,
} from "store/ducks";

export function* userSecondaryEmailRequest(action: any) {
  const { postData, onSuccess, onFailure }: UserSecondaryEmailRequestAction =
    action;
  try {    
    const { data } = yield call(api.post, `/user-secondary-email/create`, postData);
    onSuccess && onSuccess(data.id);
    notify("success", "E-mail secundário foi Cadastrado!");
    yield all([put(UserSecondaryEmailActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(UserSecondaryEmailActions.failure(errorMessage));
  }
}
