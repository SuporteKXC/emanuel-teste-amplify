import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteBusinessUnitActions } from "store/ducks/settings/business-unit";

export function* deleteBusinessUnitRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/business-units/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteBusinessUnitActions.success(data));
    notify("success", "Unidade deletada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteBusinessUnitActions.failure(errorMessage));
  }
}
