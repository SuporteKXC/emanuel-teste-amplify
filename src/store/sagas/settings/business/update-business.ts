import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateBusinessActions } from "store/ducks/settings/business";

export function* updateBusinessRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/business/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateBusinessActions.success(data));
    notify("success", "Lista de negócios atualizada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateBusinessActions.failure(errorMessage));
  }
}
