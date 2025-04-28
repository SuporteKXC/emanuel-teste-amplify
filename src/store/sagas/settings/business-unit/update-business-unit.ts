import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateBusinessUnitActions } from "store/ducks/settings/business-unit";

export function* updateBusinessUnitRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/business-units/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateBusinessUnitActions.success(data));
    notify("success", "Unidades atualizada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateBusinessUnitActions.failure(errorMessage));
  }
}
