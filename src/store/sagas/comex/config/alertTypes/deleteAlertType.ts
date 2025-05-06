import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
    DeleteAlertTypeActions,
    DeleteAlertTypeRequestAction,
} from 'store/ducks';

export function* deleteAlertTypeRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteAlertTypeRequestAction = action;
  try {
    const { data } = yield call(api.delete, `/alert-type/delete/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Tipo de alerta deletado!');
    yield all([
      put(DeleteAlertTypeActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(DeleteAlertTypeActions.failure(errorMessage));
  }
}