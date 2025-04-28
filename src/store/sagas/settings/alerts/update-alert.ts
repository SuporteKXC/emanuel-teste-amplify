import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateAlertActions } from "store/ducks/settings/alerts";

export function* updateAlertRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/alerts/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateAlertActions.success(data));
    notify("success", "Alerta atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateAlertActions.failure(errorMessage));
  }
}
