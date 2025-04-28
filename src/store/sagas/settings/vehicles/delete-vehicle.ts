import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteVehicleActions } from "store/ducks/settings/vehicles";

export function* deleteVehicleRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(apiGeneral.delete, `/vehicles/${id}`);

    const { data } = responseBody;
    yield put(DeleteVehicleActions.success(data));
    notify("success", "Veículo deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteVehicleActions.failure(errorMessage));
  }
}
