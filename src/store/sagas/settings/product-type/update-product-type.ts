import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateProductTypeActions } from "store/ducks/settings/product-type";

export function* updateProductTypeRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/product-types/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateProductTypeActions.success(data));
    notify("success", "Centro atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateProductTypeActions.failure(errorMessage));
  }
}
