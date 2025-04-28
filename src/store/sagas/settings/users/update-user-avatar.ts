import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateUserAvatarActions } from "store/ducks/settings/users";

export function* updateUserAvatar(action: any) {
  try {
    const { id ,putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/user-avatar/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateUserAvatarActions.success(data));
    notify("success", "Avatar alterado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { onFailure } = action as IUpdateRequest;
    if (onFailure) onFailure();
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateUserAvatarActions.failure(errorMessage));
  }
}
