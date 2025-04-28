import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { ICreateRequest } from "interfaces/create-duck";
import { requestErrorHandler } from "utils";
import { CreateCompanyCarrierActions } from "store/ducks/settings/company-carriers";

export function* createCompanyCarrierRequest(action: any) {
  try {
    const { postData, onSuccess } = action as ICreateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.post,
      `/company-carrier-route`,
      postData
    );

    const { data } = responseBody;
    yield put(CreateCompanyCarrierActions.success(data));
    notify("success", "Cadastrado com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(CreateCompanyCarrierActions.failure(errorMessage));
  }
}