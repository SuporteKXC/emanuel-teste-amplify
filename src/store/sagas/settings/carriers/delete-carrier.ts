import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteCarrierActions } from "store/ducks/settings/carriers";

export function* deleteCarrierRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/carriers/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteCarrierActions.success(data));
    notify("success", "Transportadora deletada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteCarrierActions.failure(errorMessage));
  }
}
