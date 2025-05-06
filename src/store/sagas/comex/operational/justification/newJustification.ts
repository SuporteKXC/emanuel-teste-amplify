import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  NewJustificationRequestAction,
  NewJustificationActions
} from 'store/ducks/comex/operational'

export function* newJustificationRequest(action: any) {
    const { postData, onSuccess, onFailure }: NewJustificationRequestAction = action;
    try {
      const { data } = yield call(api.post, `/justification/create`, postData);
      onSuccess && onSuccess(data.id);
      notify('success', 'Justificativa Cadastrada!');
      yield all([
        put(NewJustificationActions.success()),
      ]);
    } catch (error) {
      const { errorMessage } = apiErrorHandler(error);
      onFailure && onFailure();
      notify('error', errorMessage);
      console.log(error)
      yield put(NewJustificationActions.failure(errorMessage));
    }
  }