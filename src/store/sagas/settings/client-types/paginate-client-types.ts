import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateClientTypesActions } from "store/ducks/settings/client-types";

export function* paginateClientTypesRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/client-types?${queryString}`
    );

    const { clientTypes, pagination } = responseBody;
    yield put(PaginateClientTypesActions.success(clientTypes, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateClientTypesActions.failure(errorMessage));
  }
}
