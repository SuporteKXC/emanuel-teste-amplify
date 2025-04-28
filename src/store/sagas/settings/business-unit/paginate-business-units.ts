import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateBusinessUnitsActions } from "store/ducks/settings/business-unit";

export function* paginateBusinessUnitsRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/business-units?${queryString}`
    );

    const { units, pagination } = responseBody;
    yield put(PaginateBusinessUnitsActions.success(units, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateBusinessUnitsActions.failure(errorMessage));
  }
}
