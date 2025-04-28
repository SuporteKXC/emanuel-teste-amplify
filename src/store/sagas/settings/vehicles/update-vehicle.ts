import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateVehicleActions } from "store/ducks/settings/vehicles";

export function* updateVehicleRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/vehicles/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateVehicleActions.success(data));
    notify("success", "Veículo atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateVehicleActions.failure(errorMessage));
  }
}
