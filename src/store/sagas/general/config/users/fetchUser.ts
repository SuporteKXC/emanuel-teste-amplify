import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchUserRequestAction,
  FetchUserActions
} from 'store/ducks'

export function* fetchUserRequest(action: any) {
    const { id, onSuccess, onFailure }: FetchUserRequestAction = action;

    try {
      const { data } = yield call(api.get, `/user/show/${id}`);

      onSuccess && onSuccess(data);
      yield all([
        put(FetchUserActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(FetchUserActions.failure(errorMessage));
    }
  }