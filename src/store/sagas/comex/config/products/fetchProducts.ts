import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchProductRequestAction,
  FetchProductActions
} from 'store/ducks'

export function* fetchProductRequest(action: any) {
    const { id, onSuccess, onFailure }: FetchProductRequestAction = action;

    try {
      const { data } = yield call(api.get, `/product/show/${id}`);

      onSuccess && onSuccess(data);
      yield all([
        put(FetchProductActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(FetchProductActions.failure(errorMessage));
    }
  }