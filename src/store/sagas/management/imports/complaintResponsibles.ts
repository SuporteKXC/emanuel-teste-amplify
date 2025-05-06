import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {  ComplaintResponsiblesActions, ComplaintResponsiblesRequestAction } from "store/ducks/management";



export function* complaintResponsiblesRequest(action: any) {
  const {
    query,
    onSuccess,
    onFailure,
  }: ComplaintResponsiblesRequestAction = action;

  try {
    const url = applyQueryString("complaint-responsibles", {
      ...query
    });
 
    const { data } = yield call(apiStocks.get, url);
  
    onSuccess && onSuccess(data.data);
    yield all([put(ComplaintResponsiblesActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    yield put(ComplaintResponsiblesActions.failure(errorMessage));
  }
}
