import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateVehicleTypeActions } from "store/ducks/settings/vehicle-types";

export function* updateVehicleTypeRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/vehicle-types/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateVehicleTypeActions.success(data));
    notify("success", "Tipo de veículo atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateVehicleTypeActions.failure(errorMessage));
  }
}
