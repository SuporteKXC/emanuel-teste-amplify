import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  CreditHistoryRequestAction,
  CreditHistoryActions
} from 'store/ducks'

export function* creditHistoriesRequest(action: any) {
  const { params, onSuccess, onFailure }: CreditHistoryRequestAction = action;
    
  try {
    const url = applyQueryString(`/credit-history/index`,params)
    const { data } = yield call(api.get, url)
    
    onSuccess && onSuccess(data);
    yield all([
      put(CreditHistoryActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(CreditHistoryActions.failure(errorMessage));
  }
}