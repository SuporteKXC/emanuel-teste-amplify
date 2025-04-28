import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateProductCompaniesActions } from "store/ducks/settings/product-companies";

export function* paginateProductCompaniesRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/product-comnpanies?${queryString}`
    );

    const { products, pagination } = responseBody;
    yield put(PaginateProductCompaniesActions.success(products, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateProductCompaniesActions.failure(errorMessage));
  }
}
