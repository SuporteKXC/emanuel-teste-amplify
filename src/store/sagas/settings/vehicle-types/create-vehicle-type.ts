import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateVehicleTypeActions } from "store/ducks/settings/vehicle-types";

export function* createVehicleTypeRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/vehicle-types`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateVehicleTypeActions.success(data));
    notify("success", "Tipo de veículo cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateVehicleTypeActions.failure(errorMessage));
  }
}
