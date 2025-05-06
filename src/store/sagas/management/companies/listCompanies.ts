import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  CompaniesListActions,
  CompaniesListRequestAction,
} from "store/ducks/management/companies";

export function* listCompaniesRequest(action: any) {
  const { query, onSuccess, onFailure }: CompaniesListRequestAction = action;

  try {
    const url = applyQueryString("companies", {
      ...query,
      asList: 1,
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data);
    yield all([put(CompaniesListActions.success(data, data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(CompaniesListActions.failure(errorMessage));
  }
}
