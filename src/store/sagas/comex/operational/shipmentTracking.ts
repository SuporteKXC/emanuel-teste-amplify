import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemShipmentSubscribeActions,
  OrderItemShipmentTrackingRequestAction,
  OrderItemShipmentTrackingActions,
} from 'store/ducks/comex/operational'

export function* orderItemShipmentTrackingRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemShipmentTrackingRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/container-tracking/${id}`);
    onSuccess && onSuccess();
    yield all([
      put(OrderItemShipmentTrackingActions.success(data)),
      put(OrderItemShipmentSubscribeActions.success())
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    // notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemShipmentTrackingActions.failure(errorMessage));
  }
}