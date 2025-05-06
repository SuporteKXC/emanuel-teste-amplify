import { all, call, put } from "redux-saga/effects";
import { apiErrorHandler, apiStocks, applyQueryString, notify } from "services";
import { TransferListActions } from "store/ducks/management/transfer";

export function* transferList(action: any) {
    const {
      query,
      onSuccess,
      onFailure,
    }: any = action;

    try {
        const url = applyQueryString("transfer", {
          ...query
        });

        const { data } = yield call(apiStocks.get, url);

        onSuccess && onSuccess(data.data);
        yield all([put(TransferListActions.success(data.data, data.meta))]);
      } catch (error) {
        const { errorMessage } = apiErrorHandler(error);
        onFailure && onFailure();
        notify("error", errorMessage);
        yield put(TransferListActions.failure(errorMessage));
      }
}