import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateProductActions } from "store/ducks/settings/products";

export function* createProductRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/products`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateProductActions.success(data));
    notify("success", "Produto cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateProductActions.failure(errorMessage));
  }
}
