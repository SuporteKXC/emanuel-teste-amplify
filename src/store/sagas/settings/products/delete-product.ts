import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteProductActions } from "store/ducks/settings/products";

export function* deleteProductRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/products/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteProductActions.success(data));
    notify("success", "Produto deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteProductActions.failure(errorMessage));
  }
}
