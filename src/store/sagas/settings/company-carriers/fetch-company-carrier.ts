import { call, put } from "redux-saga/effects";
import { apiGeneral, notify } from "services";
import { IUpdateRequest } from "interfaces/update-duck";
import { requestErrorHandler } from "utils";
import { FetchCompanyCarrierActions } from "store/ducks/settings/company-carriers";

export function* fetchCompanyCarrierRequest(action: any) {
  try {
    const { id, onSuccess } = action as IUpdateRequest;

    const { data } = yield call(
      apiGeneral.get,
      `/company-carrier-route/${id}`
    );

    yield put(FetchCompanyCarrierActions.success(data));
    if (onSuccess) onSuccess();
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(FetchCompanyCarrierActions.failure(errorMessage));
  }
}