import { call, put } from "redux-saga/effects";

import { apiWms, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { ExportStockMovementActions } from "store/ducks/wms";

export function* ExportStockMovementRequest(action: any) {
  try {
    action.query.all = true;
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiWms.get,
      `/dashboard/stock_movements?${queryString}`
    );

    const data = responseBody;
    yield put(ExportStockMovementActions.success(data));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ExportStockMovementActions.failure(errorMessage));
  }
}
