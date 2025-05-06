import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  CancelOrderItensActions,
  CancelOrderItensRequestAction
} from 'store/ducks/comex/operational';

export function* cancelOrderItensRequest(action: any) {
  const { postData, onSuccess, onFailure }: CancelOrderItensRequestAction = action;
  const url = applyQueryString(`/order-item/cancel`, postData)
  try {
    const { data } = yield call(api.post, url);
    onSuccess && onSuccess();
    notify('success', 'Ordens de compra canceladas!');
    yield all([
      put(CancelOrderItensActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(CancelOrderItensActions.failure(errorMessage));
  }
}
  
