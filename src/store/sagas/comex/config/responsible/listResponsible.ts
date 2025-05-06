import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ResponsibleRequestAction,
  ResponsibleActions
} from 'store/ducks'

export function* responsibleRequest(action: any) {
  const { onSuccess, onFailure }: ResponsibleRequestAction = action;

  try {
    const { data } = yield call(api.get, `/responsible/index`);
    onSuccess && onSuccess(data);
    yield all([
      put(ResponsibleActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(ResponsibleActions.failure(errorMessage));
  }
}