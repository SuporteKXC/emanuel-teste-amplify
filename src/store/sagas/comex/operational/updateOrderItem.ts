import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  UpdateOrderItemActions,
  UpdateOrderItemRequestAction
} from 'store/ducks/comex/operational';

export function* updateOrderItemRequest(action: any) {
  const {id, postData, onSuccess, onFailure }: UpdateOrderItemRequestAction = action;
  try {
    const { data } = yield call(api.put, `/order-item/update/${id}`, postData);
    onSuccess && onSuccess();
    notify('success', 'Ordens de compra atualizadas!');
    yield all([
      put(UpdateOrderItemActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateOrderItemActions.failure(errorMessage));
  }
}
  
