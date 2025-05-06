import {
  ListCountriesActions,
  ListCountriesRequestAction,
} from "store/ducks/general";
import { call, put } from "@redux-saga/core/effects";
import { apiStocks, notify, apiErrorHandler, applyQueryString } from "services";

export function* listCountriesRequest(action: any) {
  const {
    query = {},
    onSuccess,
    onFailure,
  }: ListCountriesRequestAction = action;
  try {
    const url = applyQueryString("countries", {
      ...query,
      asList: 1,
    });
    const { data } = yield call(apiStocks.get, url);
    onSuccess && onSuccess(data);
    yield put(ListCountriesActions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ListCountriesActions.failure(errorMessage));
  }
}
