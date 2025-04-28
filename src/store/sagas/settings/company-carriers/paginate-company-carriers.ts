import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateCompanyCarriersActions } from "store/ducks/settings/company-carriers";

export function* paginateCompanyCarriersRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data } = yield call(
      apiGeneral.get,
      `/company-carrier-route?${queryString}`
    );

    yield put(PaginateCompanyCarriersActions.success(data, null));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateCompanyCarriersActions.failure(errorMessage));
  }
}
