import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";

import { DeletePalletTypeActions } from "store/ducks/settings/pallet-type";

export function* deletePalletTypeRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/palletType/${id}`
    );

    const { data } = responseBody;
    yield put(DeletePalletTypeActions.success(data));
    notify("success", "Centro removido com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeletePalletTypeActions.failure(errorMessage));
  }
}
