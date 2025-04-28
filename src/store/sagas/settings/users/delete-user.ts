import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteUserActions } from "store/ducks/settings/users";

export function* deleteUserRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/users/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteUserActions.success(data));
    notify("success", "Usuário deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteUserActions.failure(errorMessage));
  }
}
