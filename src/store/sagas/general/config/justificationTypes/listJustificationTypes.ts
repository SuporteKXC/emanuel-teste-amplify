import { all, call, put } from '@redux-saga/core/effects';
import { notify, apiErrorHandler, apiStocks, api, applyQueryString } from 'services';
import {
  JustificationTypesRequestAction,
  JustificationTypesActions
} from 'store/ducks'

export function* justificationTypesRequest(action: any) {
  const { params,onSuccess, onFailure }: JustificationTypesRequestAction = action;

  try {
    const url = applyQueryString('/justification-type/get',params)
    const { data } = yield call(apiStocks.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(JustificationTypesActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(JustificationTypesActions.failure(errorMessage));
  }
}