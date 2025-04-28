import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateUserPasswordActions } from "store/ducks/settings/users";

export function* updateUserPassword(action: any) {
  try {
    const { id ,putData, onSuccess } = action as IUpdateRequest;
    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/users/update-password/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateUserPasswordActions.success(data));
    notify("success", "Senha alterada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { onFailure } = action as IUpdateRequest;
    if (onFailure) onFailure();
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateUserPasswordActions.failure(errorMessage));
  }
}
