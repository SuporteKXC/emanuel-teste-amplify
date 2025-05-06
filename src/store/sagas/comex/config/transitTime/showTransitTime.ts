import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  ShowTransitTimeRequestAction,
  ShowTransitTimeActions,
} from "store/ducks";

export function* showTransitTimeRequest(action: any) {
  const { id, onSuccess, onFailure }: ShowTransitTimeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/transit-time/show/${id}`);

    onSuccess && onSuccess(data);
    yield all([put(ShowTransitTimeActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ShowTransitTimeActions.failure(errorMessage));
  }
}
