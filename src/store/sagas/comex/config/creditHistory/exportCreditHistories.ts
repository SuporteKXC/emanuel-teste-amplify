import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import { ExportCreditHistoriesRequestAction, ExportCreditHistoriesActions } from "store/ducks";

export function* exportCreditHistoriesRequest(action: any) {
  const { params, onSuccess, onFailure }: ExportCreditHistoriesRequestAction = action;

  try {
    const url = applyQueryString("/credit-history/index", params);
    const { data } = yield call(api.get, url);
    
    onSuccess && onSuccess(data);
    yield all([
      put(ExportCreditHistoriesActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(ExportCreditHistoriesActions.failure(errorMessage));
  }
}
