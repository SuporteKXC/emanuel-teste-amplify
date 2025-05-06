import { all, call, put } from '@redux-saga/core/effects';
import { api, notify } from 'services';
import { AuthActions } from 'store/ducks/auth';
import { PaginationParamsCacheActions } from 'store/ducks/paginationCache';

export function* logoutRequest() {
  try {
    yield call(api.post, 'auth/logout');
  } finally {
    notify('success', 'Até mais!');
    yield all([put(PaginationParamsCacheActions.reset()), put(AuthActions.setData(null))]);
  }
}
