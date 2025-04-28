import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdatePalletTypeActions } from "store/ducks/settings/pallet-type";

export function* updatePalletTypeRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/palletType/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdatePalletTypeActions.success(data));
    notify("success", "Pallet atualizado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdatePalletTypeActions.failure(errorMessage));
  }
}
