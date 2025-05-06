import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { JustificationSnapshotTypesListActions, JustificationSnapshotTypesListRequestAction } from "store/ducks/management/justificationSnapshotTypes";

export function* listJustificationSnapshotTypesRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: JustificationSnapshotTypesListRequestAction = action;

  try {
    const url = applyQueryString("justification-snapshot-type", {
      ...query
    });

    const { data } = yield call(apiStocks.get, url);

    // onSuccess && onSuccess(data);
    yield all([put(JustificationSnapshotTypesListActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(JustificationSnapshotTypesListActions.failure(errorMessage));
  }
}
