import { call, put } from "redux-saga/effects";

import { apiWms, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateStocksActions } from "store/ducks/wms";

export function* paginateStocksRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiWms.get,
      `/dashboard/stocks?${queryString}`
    );

    
    const { data, meta } = responseBody;
    console.log('data',data)
    console.log('meta',meta)
    yield put(PaginateStocksActions.success(data, meta));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateStocksActions.failure(errorMessage));
  }
}
