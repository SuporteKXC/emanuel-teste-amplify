import { all, call, put } from "@redux-saga/core/effects";
// import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import { notify, apiErrorHandler, apiStocks } from "services";
import { StorageLocationIndexActions, StorageLocationIndexRequestAction } from "store/ducks/management/storageLocation";

export function* indexStorageLocation(action: any) {
  const {
    // query,
    onSuccess,
    onFailure,
  }: StorageLocationIndexRequestAction = action;

  try {
    // const url = applyQueryString("storage-location", { ...query });
    
    // const { data } = yield call(apiStocks.get, url);

    const { data } = yield call(apiStocks.get, `storage-location`);

    onSuccess && onSuccess(data);
    yield all([put(StorageLocationIndexActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(StorageLocationIndexActions.failure(errorMessage));
  }
}
