import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ClientRequestAction,
  ClientActions
} from 'store/ducks'

export function* clientRequest(action: any) {
    const { onSuccess, onFailure }: ClientRequestAction = action;

    try {
      const { data } = yield call(api.get, `/client/index`);

      onSuccess && onSuccess(data);
      yield all([
        put(ClientActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(ClientActions.failure(errorMessage));
    }
  }