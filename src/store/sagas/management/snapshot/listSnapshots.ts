import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  SnapshotListActions,
  SnapshotListRequestAction,
} from "store/ducks/management";

export function* listSnapshotsRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: SnapshotListRequestAction = action;

  try {
    const url = applyQueryString("snapshots", {
      ...query
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data.data);
    yield all([put(SnapshotListActions.success(data.data, data.meta))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(SnapshotListActions.failure(errorMessage));
  }
}
