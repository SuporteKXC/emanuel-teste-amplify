import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { DivergentListRequestAction, SnapshotDivergentListActions } from "store/ducks/management/snapshotDivergent";

export function* listDivergentRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: DivergentListRequestAction = action;

  try {
    const url = applyQueryString("snapshot-divergent", {
      ...query
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data.data);
    yield all([put(SnapshotDivergentListActions.success(data.data, data.meta))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(SnapshotDivergentListActions.failure(errorMessage));
  }
}
