import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserAlertActions } from "store/ducks/settings/user-alerts";

export function* createUserAlertRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-alerts`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateUserAlertActions.success(data));
    notify("success", "Usuário adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserAlertActions.failure(errorMessage));
  }
}
