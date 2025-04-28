import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateBusinessUnitActions } from "store/ducks/settings/business-unit";

export function* createBusinessUnitRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/business-units`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateBusinessUnitActions.success(data));
    notify("success", "Unidade cadastrada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateBusinessUnitActions.failure(errorMessage));
  }
}
