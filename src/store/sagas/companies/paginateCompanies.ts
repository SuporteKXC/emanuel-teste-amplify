import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  PaginateCompaniesActions as Actions,
  PaginateCompaniesRequestAction as RequestAction,
} from 'store/ducks/companies';

export function* paginateCompaniesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('companies', query);
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data.data, data.meta));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
