import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListVehicleTypesActions } from "store/ducks/settings/vehicle-types";

import { VehicleType } from "interfaces/vehicle-type";

export function* listVehicleTypesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/vehicle-types?${queryString}`);
    const comboOptions = data.map((vehicleType: VehicleType) => ({
      value: vehicleType.id,
      label: vehicleType.name,
    }));

    yield put(ListVehicleTypesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListVehicleTypesActions.failure(errorMessage));
  }
}
