import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { ImportListActions, ImportListRequestAction } from "store/ducks/management";

export function* listImportsRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: ImportListRequestAction = action;

  try {
    const url = applyQueryString("stock-orders", {
      ...query
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data.data);
    yield all([put(ImportListActions.success(data.data, data.meta))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ImportListActions.failure(errorMessage));
  }
}
