import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserBusinessLineActions } from "store/ducks/settings/users";

export function* createUserBusinessLineRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-business-lines`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateUserBusinessLineActions.success(data));
    notify("success", "Segmento adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserBusinessLineActions.failure(errorMessage));
  }
}
