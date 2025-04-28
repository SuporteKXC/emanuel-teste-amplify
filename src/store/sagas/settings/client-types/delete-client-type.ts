import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteClientTypeActions } from "store/ducks/settings/client-types";

export function* deleteClientTypeRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/client-types/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteClientTypeActions.success(data));
    notify("success", "Customer Segmentation deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteClientTypeActions.failure(errorMessage));
  }
}
