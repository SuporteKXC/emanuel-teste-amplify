import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateVehiclesActions } from "store/ducks/settings/vehicles";

export function* paginateVehiclesRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/vehicles?${queryString}`
    );

    const { vehicles, pagination } = responseBody;
    yield put(PaginateVehiclesActions.success(vehicles, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateVehiclesActions.failure(errorMessage));
  }
}
