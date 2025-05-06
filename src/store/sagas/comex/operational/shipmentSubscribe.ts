import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemShipmentSubscribeRequestAction,
  OrderItemShipmentSubscribeActions
} from 'store/ducks/comex/operational'

export function* orderItemShipmentSubscribeRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemShipmentSubscribeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/start-container-tracking/${id}`);
    onSuccess && onSuccess();
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemShipmentSubscribeActions.failure(errorMessage));
  }
}