import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateBusinessActions } from "store/ducks/settings/business";

export function* createBusinessRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/business`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateBusinessActions.success(data));
    notify("success", "Lista de negócios cadastrada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateBusinessActions.failure(errorMessage));
  }
}
