import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateCompanyActions } from "store/ducks/settings/companies";

export function* createCompanyRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/companies`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateCompanyActions.success(data));
    notify("success", "Centro cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateCompanyActions.failure(errorMessage));
  }
}
