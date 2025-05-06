import { call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler } from "services";
import {
  SearchOrderOptionsActions,
  SearchOrderOptionsRequestAction,
} from "store/ducks/comex";

export function* searchOrderOptions(action: any) {
  const { order }: SearchOrderOptionsRequestAction = action;

  try {
    let url = `/order-files/search`;
    if (order) {
      url = `/order-files/search?order=${order}`;
    }

    const { data } = yield call(api.get, url);

    yield put(SearchOrderOptionsActions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);

    notify("error", errorMessage);
    console.log(error);
    yield put(SearchOrderOptionsActions.failure(errorMessage));
  }
}
