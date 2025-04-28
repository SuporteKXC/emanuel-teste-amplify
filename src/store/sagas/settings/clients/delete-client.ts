import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteClientActions } from "store/ducks/settings/clients";

export function* deleteClientRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/clients/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteClientActions.success(data));
    notify("success", "Cliente deletado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteClientActions.failure(errorMessage));
  }
}
