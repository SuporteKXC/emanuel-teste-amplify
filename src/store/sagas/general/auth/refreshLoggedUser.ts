import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  AuthRequestAction,
  AuthActions
} from 'store/ducks'

export function* authUserRefreshRequest(action: any) {
    const { id, onSuccess, onFailure }: AuthRequestAction = action;

    try {
      const { data } = yield call(api.get, `/user`);
      
      onSuccess && onSuccess(data);
      yield all([
        put(AuthActions.refresh(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
    }
  }