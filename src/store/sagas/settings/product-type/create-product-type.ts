import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateProductTypeActions } from "store/ducks/settings/product-type";

export function* createProductTypeRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/product-types`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateProductTypeActions.success(data));
    notify("success", "Tipo adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateProductTypeActions.failure(errorMessage));
  }
}
