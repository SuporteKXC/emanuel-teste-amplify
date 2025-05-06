import { all, call, put } from "@redux-saga/core/effects";
import { api, notify, apiErrorHandler, applyQueryString } from "services";
import {
  OrderItemDelayRequestAction,
  OrderItemDelayActions,
} from "store/ducks/comex/dashboard";

export function* orderItemDelayRequest(action: any) {
  const { params, onSuccess, onFailure }: OrderItemDelayRequestAction = action;

  try {
    const url = applyQueryString(`/order-item/delay`, params);
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([put(OrderItemDelayActions.success(data))]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify("error", errorMessage);
    console.log(error);
    yield put(OrderItemDelayActions.failure(errorMessage));
  }
}
