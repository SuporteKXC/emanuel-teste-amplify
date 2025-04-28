import { call, put } from "redux-saga/effects";

import { apiGeneral, queryBuilder, notify } from "services";
import { IPaginateRequest } from "interfaces/paginate-duck";
import { requestErrorHandler } from "utils";
import { PaginateVehicleTypesActions } from "store/ducks/settings/vehicle-types";

export function* paginateVehicleTypesRequest(action: any) {
  try {
    const { query = {} } = action as IPaginateRequest;
    const queryString = queryBuilder(query);

    const { data: responseBody } = yield call(
      apiGeneral.get,
      `/vehicle-types?${queryString}`
    );

    const { vehicleTypes, pagination } = responseBody;
    yield put(PaginateVehicleTypesActions.success(vehicleTypes, pagination));
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(PaginateVehicleTypesActions.failure(errorMessage));
  }
}
