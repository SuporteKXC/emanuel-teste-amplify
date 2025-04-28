import { call, put } from "redux-saga/effects";

import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateClientTypeActions } from "store/ducks/settings/client-types";

export function* createClientTypeRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/client-types`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateClientTypeActions.success(data));
    notify("success", "Customer Segmentation cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateClientTypeActions.failure(errorMessage));
  }
}
