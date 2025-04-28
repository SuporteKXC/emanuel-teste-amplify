import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { CepActions } from "store/ducks/cep";

export function* fetchCepRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/cep/${id}`);

    yield put(CepActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CepActions.failure(errorMessage));
  }
}
