import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateProductExceptionActions } from "store/ducks/settings/product-exceptions";

export function* updateProductExceptionRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/product-exceptions/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateProductExceptionActions.success(data));
    notify("success", "Centro atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateProductExceptionActions.failure(errorMessage));
  }
}
