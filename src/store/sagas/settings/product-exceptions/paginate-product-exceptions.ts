import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateProductExceptionActions } from "store/ducks/settings/product-exceptions";

export function* paginateProductExceptionRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/product-exceptions?${queryString}`
    );

    const { products, pagination } = responseBody;
    yield put(PaginateProductExceptionActions.success(products, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateProductExceptionActions.failure(errorMessage));
  }
}
