import { all, call, put } from "@redux-saga/core/effects";
import { notify, apiErrorHandler, apiStocks, applyQueryString } from "services";
import {
  CarriersListActions,
  CarriersListRequestAction,
} from "store/ducks/trackingDelivery/carriers";

export function* listCarriersRequest(action: any) {
  const { query, onSuccess, onFailure }: CarriersListRequestAction = action;

  try {
    const url = applyQueryString("carriers", {
      ...query,
      asList: 1,
    });

    const { data } = yield call(apiStocks.get, url);

    onSuccess && onSuccess(data);
    yield all([put(CarriersListActions.success(data, data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(CarriersListActions.failure(errorMessage));
  }
}
