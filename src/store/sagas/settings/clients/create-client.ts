import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateClientActions } from "store/ducks/settings/clients";

export function* createClientRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/clients`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateClientActions.success(data));
    notify("success", "Cliente cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateClientActions.failure(errorMessage));
  }
}
