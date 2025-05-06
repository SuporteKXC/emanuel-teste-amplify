import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ProductPaginateRequestAction,
  ProductPaginateActions
} from 'store/ducks'

export function* productPaginateRequest(action: any) {
  const { params, onSuccess, onFailure }: ProductPaginateRequestAction = action;

  try {
    const url = applyQueryString(`/product/product-paginate`, params)
    const { data } = yield call(api.get, url);

    onSuccess && onSuccess(data);
    yield all([
      put(ProductPaginateActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(ProductPaginateActions.failure(errorMessage));
  }
}
