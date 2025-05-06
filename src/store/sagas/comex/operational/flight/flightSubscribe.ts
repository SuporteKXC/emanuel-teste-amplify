import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemFlightSubscribeRequestAction,
  OrderItemFlightSubscribeActions
} from 'store/ducks/comex/operational'

export function* orderItemFlightSubscribeRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemFlightSubscribeRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/flight/tracking-start/${id}`);
    onSuccess && onSuccess();
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemFlightSubscribeActions.failure(errorMessage));
  }
}