import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateUserCompanyActions } from "store/ducks/settings/users";

export function* createUserCompanyRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/user-companies`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateUserCompanyActions.success(data));
    notify("success", "Centro adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateUserCompanyActions.failure(errorMessage));
  }
}
