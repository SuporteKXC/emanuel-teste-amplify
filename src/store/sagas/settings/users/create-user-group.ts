import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserGroupActions } from "store/ducks/settings/users";

export function* createUserGroupRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-groups`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateUserGroupActions.success(data));
    notify("success", "Grupo adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserGroupActions.failure(errorMessage));
  }
}
