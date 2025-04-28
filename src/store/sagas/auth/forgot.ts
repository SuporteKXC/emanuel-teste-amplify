import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { ForgotActions } from "store/ducks/auth/forgot";

export function* forgotRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/forgot`,
      postData
    );
    const { name, email } = responseBody;
    yield put(ForgotActions.success({ name, email }));
    notify(
      "success",
      "Sua senha foi resetada com sucesso. Acesse seu e-mail e siga as instruções."
    );
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ForgotActions.failure(errorMessage));
  }
}
