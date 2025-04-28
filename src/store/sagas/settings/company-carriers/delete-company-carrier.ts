import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { DeleteCompanyCarrierActions } from "store/ducks/settings/company-carriers";

export function* deleteCompanyCarrierRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data: responseBody } = yield call(
      apiGeneral.delete,
      `/company-carrier-route/${id}`
    );

    const { data } = responseBody;
    yield put(DeleteCompanyCarrierActions.success(data));
    notify("success", "Transportadora por Centro deletada com sucesso");
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(DeleteCompanyCarrierActions.failure(errorMessage));
  }
}
