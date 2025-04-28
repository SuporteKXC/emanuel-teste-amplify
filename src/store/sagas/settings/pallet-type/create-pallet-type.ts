import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreatePalletTypeActions } from "store/ducks/settings/pallet-type";

export function* createPalletTypeRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/palletType`,
      postData
    );

    const { data } = responseBody;
    yield put(CreatePalletTypeActions.success(data));
    notify("success", "Tipo de pallet adicionado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreatePalletTypeActions.failure(errorMessage));
  }
}
