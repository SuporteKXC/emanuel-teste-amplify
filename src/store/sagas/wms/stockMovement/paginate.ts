import { call, put } from "redux-saga/effects";

import { apiWms, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateStockMovementActions } from "store/ducks/wms";

export function* paginateStockMovementRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiWms.get,
      `/dashboard/stock_movements?${queryString}`
    );

    const { data, meta } = responseBody;
    yield put(PaginateStockMovementActions.success(data, meta));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateStockMovementActions.failure(errorMessage));
  }
}
