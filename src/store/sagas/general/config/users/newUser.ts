import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewUserActions,
  NewUserRequestAction,
} from 'store/ducks';

export function* newUserRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewUserRequestAction = action;
    try {
      const { data } = yield call(api.post, `/user/create-related`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Usuário Cadastrado!');
      yield all([
        put(NewUserActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewUserActions.failure(errorMessage));
    }
  }
  