import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateUserActions } from "store/ducks/settings/users";

export function* updateUserRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;
    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/users/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateUserActions.success(data));
    notify("success", "Usuário atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateUserActions.failure(errorMessage));
  }
}
