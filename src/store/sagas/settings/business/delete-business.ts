import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteBusinessActions } from "store/ducks/settings/business";

export function* deleteBusinessRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/business/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteBusinessActions.success(data));
    notify("success", "Lista de negócios deletada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteBusinessActions.failure(errorMessage));
  }
}
