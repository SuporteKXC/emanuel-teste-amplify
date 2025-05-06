import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemFlightLocationRequestAction,
  OrderItemFlightLocationActions
} from 'store/ducks/comex/operational'

export function* orderItemFlightLocationRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemFlightLocationRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/flight/location/${id}`);
    onSuccess && onSuccess();
    yield all([
      put(OrderItemFlightLocationActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemFlightLocationActions.failure(errorMessage));
  }
}