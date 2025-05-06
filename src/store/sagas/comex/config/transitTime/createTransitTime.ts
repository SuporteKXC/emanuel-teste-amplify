import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  NewTransitTimeActions,
  NewTransitTimeRequestAction,
} from "store/ducks";

export function* newTransitTimeRequest(action: any) {
  const { postData, onSuccess, onFailure }: NewTransitTimeRequestAction =
    action;
  try {
    const { data } = yield call(api.post, `/transit-time/create`, postData);
    onSuccess && onSuccess(data.id);
    notify("success", "Transit Time Cadastrado!");
    yield all([put(NewTransitTimeActions.success())]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(NewTransitTimeActions.failure(errorMessage));
  }
}
