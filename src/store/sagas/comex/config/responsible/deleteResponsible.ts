import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteResponsibleActions,
  DeleteResponsibleRequestAction,
} from 'store/ducks';

export function* deleteResponsibleRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteResponsibleRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/responsible/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Responsável Deletado!');
    yield all([
      put(DeleteResponsibleActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteResponsibleActions.failure(errorMessage));
  }
}
