import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateProductRequestAction,
  UpdateProductActions
} from 'store/ducks';

export function* updateProductRequest(action: any) {
  const { id, alert_critical, onSuccess, onFailure }: UpdateProductRequestAction = action;
  
  try {
    const { data } = yield call(api.put, `/product/update/${id}`, {
      alert_critical
    });
    onSuccess && onSuccess();
    notify('success', 'Produto alterado com sucesso!');
    yield all([
      put(UpdateProductActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateProductActions.failure(errorMessage));
  }
}
