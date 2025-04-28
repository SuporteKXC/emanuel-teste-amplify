import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateVehicleActions } from "store/ducks/settings/vehicles";

export function* createVehicleRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(apiGeneral.post, `/vehicles`, postData);

    const { data } = responseBody;
    yield put(CreateVehicleActions.success(data));
    notify("success", "Veículo cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateVehicleActions.failure(errorMessage));
  }
}
