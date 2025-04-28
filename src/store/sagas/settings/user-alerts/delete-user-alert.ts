import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteUserAlertActions } from "store/ducks/settings/user-alerts";

export function* deleteUserAlertRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/user-alerts/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteUserAlertActions.success(data));
    notify("success", "Usuário removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserAlertActions.failure(errorMessage));
  }
}
