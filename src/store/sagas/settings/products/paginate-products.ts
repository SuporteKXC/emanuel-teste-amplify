import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateProductsActions } from "store/ducks/settings/products";

export function* paginateProductsRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/products?${queryString}`
    );

    const { products, pagination } = responseBody;
    yield put(PaginateProductsActions.success(products, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateProductsActions.failure(errorMessage));
  }
}
