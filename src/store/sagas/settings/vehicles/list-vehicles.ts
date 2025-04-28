import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListVehiclesActions } from "store/ducks/settings/vehicles";

import { Vehicle } from "interfaces/vehicle";

export function* listVehiclesRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/vehicles?${queryString}`);
    const comboOptions = data.map((vehicle: Vehicle) => ({
      value: vehicle.id,
      label: vehicle.vehicleType.name,
      duration: vehicle.duration,
    }));

    yield put(ListVehiclesActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListVehiclesActions.failure(errorMessage));
  }
}
