import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateClientActions } from "store/ducks/settings/clients";

export function* updateClientRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/clients/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateClientActions.success(data));
    notify("success", "Cliente atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateClientActions.failure(errorMessage));
  }
}
