import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateClientTypeActions } from "store/ducks/settings/client-types";

export function* updateClientTypeRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/client-types/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateClientTypeActions.success(data));
    notify("success", "Customer Segmentation atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateClientTypeActions.failure(errorMessage));
  }
}
