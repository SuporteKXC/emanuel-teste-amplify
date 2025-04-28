import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateCarrierActions } from "store/ducks/settings/carriers";

export function* updateCarrierRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/carriers/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateCarrierActions.success(data));
    notify("success", "Transportadora atualizada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateCarrierActions.failure(errorMessage));
  }
}
