import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ShowOrderItemRequestAction,
  ShowOrderItemActions
} from 'store/ducks/comex/operational'

export function* showOrderRequest(action: any) {
    const { param, onSuccess, onFailure }: ShowOrderItemRequestAction = action;

    try {
      const { data } = yield call(api.get, `/order-item/show/${param}`);

      onSuccess && onSuccess(data);
      yield all([
        put(ShowOrderItemActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(ShowOrderItemActions.failure(errorMessage));
    }
  }