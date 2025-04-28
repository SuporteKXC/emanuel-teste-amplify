import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { UpdateCompanyCarrierActions } from "store/ducks/settings/company-carriers";

export function* updateCompanyCarrierRequest(action: any) {
  try {
    const { id, putData, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.put,
      `/company-carrier-route/${id}`,
      putData
    );

    const { data } = responseBody;
    yield put(UpdateCompanyCarrierActions.success(data));
    notify("success", "Transportadora por Centro atualizada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(UpdateCompanyCarrierActions.failure(errorMessage));
  }
}
