import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";

import { DeleteProductTypeActions } from "store/ducks/settings/product-type";

export function* deleteProductTypeRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/product-types/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteProductTypeActions.success(data));
    notify("success", "Centro removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteProductTypeActions.failure(errorMessage));
  }
}
