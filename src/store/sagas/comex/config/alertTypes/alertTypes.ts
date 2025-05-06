import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  AlertTypesRequestAction,
  AlertTypesActions
} from 'store/ducks'

export function* alertTypesRequest(action: any) {
  const { params, onSuccess, onFailure }: AlertTypesRequestAction = action;
    
  try {

    const url = applyQueryString(`/alert-type/index`, params)
    const { data } = yield call(api.get, url);
    
    onSuccess && onSuccess(data);
    yield all([
      put(AlertTypesActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(AlertTypesActions.failure(errorMessage));
  }
}