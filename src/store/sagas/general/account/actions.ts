import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ActionsRequestAction,
  ActionsListActions
} from 'store/ducks/general'

export function* actionsRequest(action: any) {
    const { onSuccess, onFailure }: ActionsRequestAction = action;

    try {
      const { data } = yield call(api.get, `/action/index`);

      onSuccess && onSuccess(data);
      yield all([
        put(ActionsListActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(ActionsListActions.failure(errorMessage));
    }
  }