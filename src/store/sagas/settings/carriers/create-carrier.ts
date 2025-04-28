import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateCarrierActions } from "store/ducks/settings/carriers";

export function* createCarrierRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/carriers`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateCarrierActions.success(data));
    notify("success", "Transportadora cadastrada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateCarrierActions.failure(errorMessage));
  }
}
