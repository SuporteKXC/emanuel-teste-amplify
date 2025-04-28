import { call, put } from "redux-saga/effects";
import { apiWms, notify, queryBuilder } from "services";
import { IExportRequest } from "interfaces/export-duck";
import { requestErrorHandler } from "utils";
import { ExportStocksActions } from "store/ducks/wms/stocks"

export function* exportStocksRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IExportRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(
      apiWms.get,
      `/dashboard/stocks/export?${queryString}`
    );

    yield put(ExportStocksActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ExportStocksActions.failure(errorMessage));
  }
}
