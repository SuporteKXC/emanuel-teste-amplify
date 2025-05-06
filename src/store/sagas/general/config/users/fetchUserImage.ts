import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchUserImageRequestAction,
  FetchUserImageActions
} from 'store/ducks'

export function* fetchUserImageRequest(action: any) {
    const { key, onSuccess, onFailure }: FetchUserImageRequestAction = action;

    try {
      const { data } = yield call(api.get, `/links/download?fileKey=${key}`);
      
      onSuccess && onSuccess();
      yield all([
        put(FetchUserImageActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(FetchUserImageActions.failure(errorMessage));
    }
  }