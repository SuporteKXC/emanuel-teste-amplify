import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  PaginateCompanyMembersActions as Actions,
  PaginateCompanyMembersRequestAction as RequestAction,
} from 'store/ducks/companyMembers';

export function* paginateCompanyMembersRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('company-members', query);
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
