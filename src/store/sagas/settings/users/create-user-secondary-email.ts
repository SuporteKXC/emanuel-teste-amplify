import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserSecondaryEmailActions } from "store/ducks/settings/users";

export function* createUserSecondaryEmailRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-email-secondary`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateUserSecondaryEmailActions.success(data));
    notify("success", "E-mail adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserSecondaryEmailActions.failure(errorMessage));
  }
}
