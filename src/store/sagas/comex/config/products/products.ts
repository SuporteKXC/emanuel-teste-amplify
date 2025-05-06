import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ProductRequestAction,
  ProductActions
} from 'store/ducks'

export function* productsRequest(action: any) {
  const { onSuccess, onFailure }: ProductRequestAction = action;

  try {
    const { data } = yield call(api.get, `/product/index`);

    onSuccess && onSuccess(data);
    yield all([
      put(ProductActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(ProductActions.failure(errorMessage));
  }
}
