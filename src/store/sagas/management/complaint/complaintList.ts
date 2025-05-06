import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks } from "services";
import { ComplaintListActions } from "store/ducks/management/complaint/complaintList";

export function* complaintListRequest(action: any) {
  const { filter } = action;
  try {
    const { data } = yield call(apiStocks.get, `complaints`, {
      params: filter,
    });
    yield all([put(ComplaintListActions.success(data.data, data.meta))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    notify("error", errorMessage);
    yield put(ComplaintListActions.failure(errorMessage));
  }
}
