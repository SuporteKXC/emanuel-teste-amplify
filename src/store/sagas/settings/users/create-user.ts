import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserActions } from "store/ducks/settings/users";

export function* createUserRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data } = yield call(apiGeneral.post, `/users`, postData);

    yield put(CreateUserActions.success(data));
    notify("success", "Usuário cadastrado com sucesso");
    if (onSuccess) onSuccess(data.id);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserActions.failure(errorMessage));
  }
}
