import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateCompaniesActions } from "store/ducks/settings/companies";

export function* paginateCompaniesRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/companies?${queryString}`
    );

    const { companies, pagination } = responseBody;
    yield put(PaginateCompaniesActions.success(companies, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateCompaniesActions.failure(errorMessage));
  }
}
