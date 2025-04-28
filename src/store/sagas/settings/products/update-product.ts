import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateProductActions } from "store/ducks/settings/products";

export function* updateProductRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/products/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateProductActions.success(data));
    notify("success", "Produto atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateProductActions.failure(errorMessage));
  }
}
