import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewResponsibleActions,
  NewResponsibleRequestAction,
} from 'store/ducks';

export function* newResponsibleRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewResponsibleRequestAction = action;
    try {
      const { data } = yield call(api.post, `/responsible/create`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Responsável Cadastrado!');
      yield all([
        put(NewResponsibleActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewResponsibleActions.failure(errorMessage));
    }
  }
  