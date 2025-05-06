import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListCompaniesActions as Actions,
  ListCompaniesRequestAction as RequestAction,
} from 'store/ducks/companies';

export function* listCompaniesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('companies', {
      ...query,
      asList: 1,
      orderBy: 'tradeName',
      direction: 'asc',
    });
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
