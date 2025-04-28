import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteVehicleTypeActions } from "store/ducks/settings/vehicle-types";

export function* deleteVehicleTypeRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/vehicle-types/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteVehicleTypeActions.success(data));
    notify("success", "Tipo de veículo deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteVehicleTypeActions.failure(errorMessage));
  }
}
