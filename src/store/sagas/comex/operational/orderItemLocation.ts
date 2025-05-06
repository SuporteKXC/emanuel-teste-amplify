import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  OrderItemLocationRequestAction,
  OrderItemLocationActions
} from 'store/ducks/comex/operational'

export function* orderItemLocationRequest(action: any) {
  const { id, onSuccess, onFailure }: OrderItemLocationRequestAction = action;

  try {
    const { data } = yield call(api.get, `/order-item/location/${id}`);
    onSuccess && onSuccess();
    yield all([
      put(OrderItemLocationActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(OrderItemLocationActions.failure(errorMessage));
  }
}