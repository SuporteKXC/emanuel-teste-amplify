
import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateManyAlertRequestAction,
  UpdateManyAlertActions
} from 'store/ducks/comex/alerts';

export function* updateManyAlertRequest(action: any) {
  const { ids, read, onSuccess, onFailure }: UpdateManyAlertRequestAction = action;
  
  try {
    const { data } = yield call(api.put, `/user-alert/update-many`, {
      ids,
      read
    });

    onSuccess && onSuccess();
    notify('success', 'Tipo de alerta atualizado!');
    yield all([
      put(UpdateManyAlertActions.success()),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(UpdateManyAlertActions.failure(errorMessage));
  }
}
