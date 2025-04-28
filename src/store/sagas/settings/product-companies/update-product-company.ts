import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateProductCompanyActions } from "store/ducks/settings/product-companies";

export function* updateProductCompanyRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/product-companies/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateProductCompanyActions.success(data));
    notify("success", "Centro atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateProductCompanyActions.failure(errorMessage));
  }
}
