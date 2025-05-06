import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  TransitTimeRequestAction,
  ListTransitTimeActions,
} from "store/ducks";

export function* transitTimeRequest(action: any) {
  const { onSuccess, onFailure }: TransitTimeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/transit-time/index`);
    onSuccess && onSuccess(data);
    yield all([put(ListTransitTimeActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ListTransitTimeActions.failure(errorMessage));
  }
}
