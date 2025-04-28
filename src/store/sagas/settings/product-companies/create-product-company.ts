import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateProductCompanyActions } from "store/ducks/settings/product-companies";

export function* createProductCompanyRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/product-companies`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateProductCompanyActions.success(data));
    notify("success", "Centro adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateProductCompanyActions.failure(errorMessage));
  }
}
