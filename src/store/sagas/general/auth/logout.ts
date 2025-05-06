import { all, call, put } from '@redux-saga/core/effects';
import { api, notify } from 'services';
import { AuthActions, LogoutActions, LoginActions } from 'store/ducks/general';

export function* logoutRequest() {
  try {
    yield call(api.post, 'logout');
  }catch(error){
    // notify('error', 'Ocorreu um erro!');
  } finally {
    notify('success', 'Até mais!');
    yield all([
      put(AuthActions.setData(null)),
    ]);
  }
}
