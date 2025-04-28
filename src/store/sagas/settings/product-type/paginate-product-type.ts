import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateProductTypeActions } from "store/ducks/settings/product-type";

export function* paginateProductTypeRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/product-types?${queryString}`
    );

    const { types, pagination } = responseBody;
    yield put(PaginateProductTypeActions.success(types, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateProductTypeActions.failure(errorMessage));
  }
}
