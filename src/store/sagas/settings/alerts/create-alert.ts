import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateAlertActions } from "store/ducks/settings/alerts";

export function* createAlertRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/alerts`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateAlertActions.success(data));
    notify("success", "Alerta cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateAlertActions.failure(errorMessage));
  }
}
