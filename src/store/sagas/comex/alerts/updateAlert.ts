
import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateAlertRequestAction,
  UpdateAlertActions
} from 'store/ducks/comex/alerts';

export function* updateAlertRequest(action: any) {
  const { id, read, onSuccess, onFailure }: UpdateAlertRequestAction = action;
  
  try {
    const { data } = yield call(api.put, `/user-alert/update/${id}`, {
      read
    });
    onSuccess && onSuccess();
    notify('success', 'Tipo de alerta atualizado!');
    yield all([
      put(UpdateAlertActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateAlertActions.failure(errorMessage));
  }
}
