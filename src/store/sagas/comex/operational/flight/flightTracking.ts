import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemFlightSubscribeActions,
  OrderItemFlightTrackingRequestAction,
  OrderItemFlightTrackingActions,
} from 'store/ducks/comex/operational'

export function* orderItemFlightTrackingRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemFlightTrackingRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/flight/tracking/${id}`);
    onSuccess && onSuccess();
    yield all([
      put(OrderItemFlightTrackingActions.success(data)),
      put(OrderItemFlightSubscribeActions.success())
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    console.log(errorMessage);
    
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemFlightTrackingActions.failure(errorMessage));
  }
}
