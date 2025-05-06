import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    UpdateUserActions,
    UpdateUserRequestAction,
} from 'store/ducks';

export function* updateUserRequest(action: any) {
    const { id, postData, onSuccess, onFailure }: UpdateUserRequestAction = action;
    try {
      const { data } = yield call(api.put, `/user/update-related/${id}`, postData);
      onSuccess && onSuccess();
      notify('success', 'Usuário Atualizado!');
      yield all([
        put(UpdateUserActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(UpdateUserActions.failure(errorMessage));
    }
  }