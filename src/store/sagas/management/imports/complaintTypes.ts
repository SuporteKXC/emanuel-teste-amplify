import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {  ComplaintTypesActions, ComplaintTypesRequestAction } from "store/ducks/management";

export function* complaintTypesRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: ComplaintTypesRequestAction = action;

  try {
    const url = applyQueryString("complaint-types", {
      ...query
    });
 
    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data.data);
    yield all([put(ComplaintTypesActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ComplaintTypesActions.failure(errorMessage));
  }
}
