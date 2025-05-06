import { call, put } from "redux-saga/effects";
import { apiErrorHandler, apiStocks, notify, applyQueryString } from "services";
import { IListRequest } from "contracts/trackingDelivery/list-duck";
import { ListDistanceActions } from "store/ducks/trackingDelivery/distance";

export function* listDistanceRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    
    const url = applyQueryString(
      `distance`,
      query || {}
    );

    const { data } = yield call(apiStocks.get, url);

    yield put(ListDistanceActions.success(data));
    if (onSuccess) return onSuccess(data);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListDistanceActions.failure(errorMessage));
  }
}
