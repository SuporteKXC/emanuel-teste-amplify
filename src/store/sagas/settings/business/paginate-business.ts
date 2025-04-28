import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateBusinessActions } from "store/ducks/settings/business";

export function* paginateBusinessRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/business?${queryString}`
    );

    const { lines, pagination } = responseBody;
    yield put(PaginateBusinessActions.success(lines, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateBusinessActions.failure(errorMessage));
  }
}
