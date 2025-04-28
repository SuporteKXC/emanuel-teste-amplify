import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { IFechRequest } from "interfaces/fetch-duck";
import { requestErrorHandler } from "utils";
import { FetchProductCompanyActions } from "store/ducks/settings/product-companies";

export function* fetchProductCompanyRequest(action: any) {
  try {
    const { id, onSuccess } = action as IFechRequest;
    const { data } = yield call(apiGeneral.get, `/product-companies/${id}`);

    yield put(FetchProductCompanyActions.success(data));
    if (onSuccess) onSuccess(data);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchProductCompanyActions.failure(errorMessage));
  }
}
