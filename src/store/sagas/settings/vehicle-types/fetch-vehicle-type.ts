import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchVehicleTypeActions } from "store/ducks/settings/vehicle-types";

export function* fetchVehicleTypeRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/vehicle-types/${id}`);

    yield put(FetchVehicleTypeActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchVehicleTypeActions.failure(errorMessage));
  }
}
