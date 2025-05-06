import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    UpdateResponsibleActions,
    UpdateResponsibleRequestAction,
} from 'store/ducks';

export function* updateResponsibleRequest(action: any) {
    const { id, postData, onSuccess, onFailure }: UpdateResponsibleRequestAction = action;
    try {
      const { data } = yield call(api.put, `/responsible/update/${id}`, postData);
      onSuccess && onSuccess();
      notify('success', 'Responsável Atualizado!');
      yield all([
        put(UpdateResponsibleActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(UpdateResponsibleActions.failure(errorMessage));
    }
  }