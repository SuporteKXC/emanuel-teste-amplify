import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateCarriersActions } from "store/ducks/settings/carriers";

export function* paginateCarriersRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/carriers?${queryString}`
    );

    const { carriers, pagination } = responseBody;
    yield put(PaginateCarriersActions.success(carriers, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateCarriersActions.failure(errorMessage));
  }
}
