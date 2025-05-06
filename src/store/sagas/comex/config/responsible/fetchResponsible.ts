import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchResponsibleRequestAction,
  FetchResponsibleActions
} from 'store/ducks'

export function* fetchResponsibleRequest(action: any) {
    const { id, onSuccess, onFailure }: FetchResponsibleRequestAction = action;

    try {
      const { data } = yield call(api.get, `/responsible/show/${id}`);

      onSuccess && onSuccess(data);
      yield all([
        put(FetchResponsibleActions.success(data))
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(FetchResponsibleActions.failure(errorMessage));
    }
  }