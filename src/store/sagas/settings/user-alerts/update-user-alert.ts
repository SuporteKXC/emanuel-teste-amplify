import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateUserAlertActions } from "store/ducks/settings/user-alerts";

export function* updateUserAlertRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/user-alerts/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateUserAlertActions.success(data));
    notify("success", "Usuário alterado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateUserAlertActions.failure(errorMessage));
  }
}
